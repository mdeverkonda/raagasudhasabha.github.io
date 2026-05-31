"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";
import {
  CHECKIN_APPS_SCRIPT_URL,
  CHECKIN_ENABLED,
} from "@/lib/checkin-config";

type Status = {
  found: boolean;
  state?: "new" | "partial" | "full";
  message?: string;
  scanned?: string;
  email?: string;
  name?: string;
  partySize?: number;
  alreadyIn?: number;
  remaining?: number;
  seatAssignment?: string;
  seatingType?: string;
  prior?: { time: string; count: number; override: boolean }[];
  suggestion?: number;
};

type Stats = {
  attendeesIn: number;
  partiesIn: number;
  expected: number;
  parties: number;
  testMode: boolean;
};

type CheckinResult = {
  ok: boolean;
  message: string;
  name?: string;
  seatAssignment?: string;
  partySize?: number;
  nowCheckedIn?: number;
  remaining?: number;
};

declare global {
  interface Window {
    Html5Qrcode?: new (id: string) => {
      start: (
        cameraConfig: { facingMode: string } | string,
        scanConfig: { fps: number; qrbox: number },
        onScan: (text: string) => void,
        onError: (err: string) => void
      ) => Promise<void>;
      pause: () => void;
      resume: () => void;
      stop: () => Promise<void>;
    };
  }
}

async function callApi(params: Record<string, string>): Promise<any> {
  if (!CHECKIN_APPS_SCRIPT_URL) {
    throw new Error("CHECKIN_APPS_SCRIPT_URL is not configured.");
  }
  const url = new URL(CHECKIN_APPS_SCRIPT_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    method: "GET",
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function CheckinPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [count, setCount] = useState(1);
  const [override, setOverride] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [scannerOn, setScannerOn] = useState(false);
  const [scannerErr, setScannerErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [manualEmail, setManualEmail] = useState("");
  const [libReady, setLibReady] = useState(false);

  const scannerRef = useRef<InstanceType<NonNullable<Window["Html5Qrcode"]>> | null>(
    null
  );

  const refreshStats = useCallback(async () => {
    try {
      const s = (await callApi({ action: "stats" })) as Stats;
      setStats(s);
    } catch {
      // soft-fail
    }
  }, []);

  useEffect(() => {
    if (CHECKIN_ENABLED && CHECKIN_APPS_SCRIPT_URL) refreshStats();
  }, [refreshStats]);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  }

  async function lookup(email: string) {
    if (!email || busy || status) return;
    setBusy(true);
    if (scannerRef.current) {
      try {
        scannerRef.current.pause();
      } catch {
        // ignore
      }
    }
    try {
      const s = (await callApi({ action: "status", email })) as Status;
      setStatus(s);
      setCount(s.suggestion ?? 1);
      setOverride(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ found: false, message: msg });
    } finally {
      setBusy(false);
    }
  }

  function closeCard() {
    setStatus(null);
    if (scannerRef.current) {
      try {
        scannerRef.current.resume();
      } catch {
        // ignore
      }
    }
  }

  async function confirm() {
    if (!status?.email) return;
    setBusy(true);
    try {
      const r = (await callApi({
        action: "checkin",
        email: status.email,
        count: String(count),
        override: String(override),
      })) as CheckinResult;
      if (r.ok) {
        showToast(`✓ ${r.message}`, true);
        closeCard();
        refreshStats();
      } else {
        showToast(r.message || "Failed", false);
      }
    } catch (e) {
      showToast(e instanceof Error ? e.message : String(e), false);
    } finally {
      setBusy(false);
    }
  }

  async function startScanner() {
    setScannerErr("");
    if (!window.Html5Qrcode) {
      setScannerErr("QR scanner library not loaded yet — try again in a moment.");
      return;
    }
    try {
      const Html5Qrcode = window.Html5Qrcode;
      const inst = new Html5Qrcode("reader");
      scannerRef.current = inst;
      await inst.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (text) => lookup(text),
        () => {
          /* per-frame decode errors are noise; ignore */
        }
      );
      setScannerOn(true);
    } catch (e) {
      setScannerErr(e instanceof Error ? e.message : String(e));
    }
  }

  async function manualLookup() {
    const v = manualEmail.trim();
    if (!v) return;
    setManualEmail("");
    await lookup(v);
  }

  // ─── Render ────────────────────────────────────────────────────────────

  if (!CHECKIN_ENABLED || !CHECKIN_APPS_SCRIPT_URL) {
    return (
      <div className="container-edge py-12">
        <h1 className="font-display italic text-3xl text-maroon">
          Concert Check-in
        </h1>
        <div className="mt-6 border-l-4 border-pink-deep bg-cream-deep/40 p-4 text-sm">
          <strong>Not configured.</strong> Paste the Apps Script web app URL into
          <code> lib/checkin-config.ts</code> and set <code>CHECKIN_ENABLED = true</code>.
        </div>
      </div>
    );
  }

  const cardStyle = !status
    ? ""
    : !status.found
    ? "border-red-700 bg-red-50"
    : status.state === "new"
    ? "border-green-700 bg-green-50"
    : status.state === "partial"
    ? "border-amber-600 bg-amber-50"
    : "border-red-700 bg-red-50";

  return (
    <>
      <Script
        src="https://unpkg.com/html5-qrcode"
        strategy="afterInteractive"
        onReady={() => setLibReady(true)}
        onLoad={() => setLibReady(true)}
      />
      <section className="bg-cream">
        <div className="container-edge max-w-2xl py-8">
          <h1 className="font-display italic text-3xl text-maroon">
            Concert Check-in
          </h1>

          {stats?.testMode && (
            <div className="mt-3 border-l-4 border-amber-600 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <strong>TEST MODE</strong> — only the test row can be checked in.
              Flip <code>TEST_MODE = false</code> in <code>Code.gs</code> and redeploy
              when ready.
            </div>
          )}

          {stats && (
            <p className="mt-3 text-sm text-muted">
              <strong className="text-lg text-maroon">
                {stats.attendeesIn} / {stats.expected}
              </strong>{" "}
              attendees ·{" "}
              <strong className="text-lg text-maroon">
                {stats.partiesIn} / {stats.parties}
              </strong>{" "}
              parties
            </p>
          )}

          {!scannerOn && (
            <button
              type="button"
              onClick={startScanner}
              disabled={!libReady}
              className="smallcaps mt-4 inline-flex min-h-12 w-full items-center justify-center border border-maroon bg-maroon px-6 py-3 text-cream transition hover:bg-maroon-deep disabled:opacity-50"
            >
              {libReady ? "Start Scanner" : "Loading scanner…"}
            </button>
          )}

          {scannerErr && (
            <div className="mt-3 border-l-4 border-red-700 bg-red-50 px-3 py-2 text-sm text-red-900">
              Camera blocked: {scannerErr}
            </div>
          )}

          <div id="reader" className="mt-4 w-full" />

          {status && (
            <div className={cn("mt-4 border-l-4 bg-white p-4", cardStyle)}>
              {!status.found ? (
                <h2 className="font-display text-xl text-maroon">
                  {status.message || "Not found"}
                </h2>
              ) : (
                <>
                  <h2 className="font-display text-xl">
                    {status.state === "new" && "✓ Welcome"}
                    {status.state === "partial" &&
                      "⚠ Part of this party already checked in"}
                    {status.state === "full" &&
                      "✗ Party already fully checked in"}
                  </h2>
                  <p className="mt-1 text-xl font-bold">{status.name}</p>
                  {status.seatAssignment && (
                    <p className="mt-1 text-2xl font-bold text-maroon">
                      {status.seatAssignment}
                    </p>
                  )}
                  {status.seatingType && (
                    <p className="text-sm text-muted">{status.seatingType}</p>
                  )}
                  {status.state === "new" && (
                    <p className="mt-1 text-sm">
                      Party of {status.partySize}. None checked in yet.
                    </p>
                  )}
                  {status.state === "partial" && (
                    <p className="mt-1 text-sm">
                      {status.alreadyIn} of {status.partySize} checked in ·{" "}
                      {status.remaining} remaining.
                    </p>
                  )}
                  {status.state === "full" && (
                    <p className="mt-1 text-sm">
                      All {status.partySize} of this party are checked in.
                    </p>
                  )}
                  {status.prior && status.prior.length > 0 && (
                    <div className="mt-3 border-l-2 border-pink-deep pl-3 text-xs text-muted">
                      <strong>Prior scans:</strong>
                      <br />
                      {status.prior.map((p, i) => (
                        <span key={i}>
                          {p.time} — {p.count} {p.override ? "(override)" : ""}
                          <br />
                        </span>
                      ))}
                    </div>
                  )}

                  <label className="mt-4 block text-sm">
                    People to check in now:
                    <input
                      type="number"
                      min={1}
                      max={Math.max(status.partySize ?? 20, 20)}
                      value={count}
                      onChange={(e) =>
                        setCount(Math.max(1, Number(e.target.value) || 1))
                      }
                      className="mt-1 block w-full border border-maroon bg-white p-2 text-base"
                    />
                  </label>

                  {status.state === "full" && (
                    <label className="mt-2 flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={override}
                        onChange={(e) => setOverride(e.target.checked)}
                      />
                      Override (party already fully checked in)
                    </label>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={confirm}
                      disabled={busy}
                      className="smallcaps inline-flex min-h-12 flex-1 items-center justify-center border border-maroon bg-maroon px-4 py-2 text-cream disabled:opacity-50"
                    >
                      Confirm check-in
                    </button>
                    <button
                      type="button"
                      onClick={closeCard}
                      className="smallcaps inline-flex min-h-12 flex-1 items-center justify-center border border-maroon/70 px-4 py-2 text-maroon"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {!status.found && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={closeCard}
                    className="smallcaps inline-flex min-h-12 w-full items-center justify-center border border-maroon/70 px-4 py-2 text-maroon"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 border-t border-pink pt-4">
            <p className="text-sm">QR won&rsquo;t scan? Type the email:</p>
            <input
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              className="mt-2 block w-full border border-maroon bg-white p-2 text-base"
            />
            <button
              type="button"
              onClick={manualLookup}
              className="smallcaps mt-2 inline-flex min-h-12 w-full items-center justify-center border border-maroon bg-maroon px-6 py-3 text-cream"
            >
              Look up
            </button>
          </div>

          {toast && (
            <div
              className={cn(
                "fixed inset-x-4 bottom-4 z-50 rounded p-4 text-center text-cream shadow-lg",
                toast.ok ? "bg-green-700" : "bg-red-700"
              )}
            >
              {toast.msg}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
