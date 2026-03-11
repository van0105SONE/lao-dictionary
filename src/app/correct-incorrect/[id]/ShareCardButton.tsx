"use client";

import { useState } from "react";

interface Props {
  incorrectWord: string;
  correctWord: string;
  explanation: string | null;
}

type Format = "facebook" | "instagram" | "tiktok";

const FORMAT_CONFIG: Record<Format, { label: string; w: number; h: number; desc: string }> = {
  facebook:  { label: "Facebook",  w: 1200, h: 630,  desc: "1200 × 630"  },
  instagram: { label: "Instagram", w: 1080, h: 1080, desc: "1080 × 1080" },
  tiktok:    { label: "TikTok",    w: 1080, h: 1920, desc: "1080 × 1920" },
};

// ─── Canvas helpers ──────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** Word-wrap that keeps text within maxWidth. Handles Lao (no spaces) & spaces. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  // Split by spaces first (for mixed text), fallback to char-by-char for Lao
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  // Second pass: if any line still overflows, split by character
  const result: string[] = [];
  for (const line of lines) {
    if (ctx.measureText(line).width <= maxWidth) {
      result.push(line);
    } else {
      const chars = [...line];
      let cur = "";
      for (const ch of chars) {
        const t = cur + ch;
        if (ctx.measureText(t).width > maxWidth && cur) {
          result.push(cur);
          cur = ch;
        } else {
          cur = t;
        }
      }
      if (cur) result.push(cur);
    }
  }
  return result;
}

function drawStrikethrough(
  ctx: CanvasRenderingContext2D,
  text: string, x: number, y: number, fontSize: number
) {
  const w = ctx.measureText(text).width;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y - fontSize * 0.08);
  ctx.lineTo(x + w / 2, y - fontSize * 0.08);
  ctx.strokeStyle = "rgba(220,38,38,0.85)";
  ctx.lineWidth = Math.max(2, fontSize * 0.07);
  ctx.stroke();
  ctx.restore();
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  label: string, fontSize: number, padding: number,
  bg: string, textColor: string
) {
  ctx.save();
  ctx.font = `700 ${fontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
  const tw = ctx.measureText(label).width;
  const pw = tw + padding * 2;
  const ph = fontSize * 1.9;
  roundRect(ctx, cx - pw / 2, cy - ph / 2, pw, ph, ph / 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, cx, cy);
  ctx.restore();
}

async function generateCard(
  format: Format,
  incorrectWord: string,
  correctWord: string,
  explanation: string | null
): Promise<string> {
  const { w, h } = FORMAT_CONFIG[format];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const isWide = w > h;     // Facebook
  const isSquare = w === h; // Instagram
  // tall = TikTok

  // ── Background gradient ──────────────────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, w * 0.7, h);
  grad.addColorStop(0, "#0c2035");
  grad.addColorStop(0.5, "#205781");
  grad.addColorStop(1, "#3d8a94");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // ── Decorative circles ───────────────────────────────────────────────────
  const drawCircle = (cx: number, cy: number, r: number, alpha: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
    ctx.restore();
  };
  drawCircle(w * 0.88, h * -0.06, w * 0.38, 0.05);
  drawCircle(w * -0.08, h * 1.06, w * 0.42, 0.04);

  // ── Dot grid decoration ──────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  const spacing = Math.floor(w / 18);
  for (let dx = spacing; dx < w; dx += spacing) {
    for (let dy = spacing; dy < h; dy += spacing) {
      ctx.beginPath();
      ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Layout constants ─────────────────────────────────────────────────────
  const outerPad   = w * 0.07;
  const cardX      = outerPad;
  const cardY      = h * (isWide ? 0.1 : 0.1);
  const cardW      = w - outerPad * 2;
  const cardBottom = h * (isWide ? 0.88 : 0.9);  // fixed bottom — no overflow!
  const cardH      = cardBottom - cardY;
  const innerPad   = w * 0.04;

  // ── Draw card panel with CLIP ─────────────────────────────────────────────
  // Draw visible panel
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, w * 0.035);
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Clip all further drawing to card bounds
  ctx.save();
  roundRect(ctx, cardX, cardY, cardW, cardH, w * 0.035);
  ctx.clip();

  // ── Top label ────────────────────────────────────────────────────────────
  const labelFontSize = Math.floor(w * 0.02);
  ctx.font = `600 ${labelFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.40)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ຄຳຜິດ  →  ຄຳຖືກ", w / 2, cardY + innerPad * 1.5);

  // ── Reserve space for explanation at bottom ───────────────────────────────
  // Calculate explanation lines FIRST so we know how much bottom space we need
  const hasEx    = !!explanation;
  const exFontSize = Math.floor(w * (isWide ? 0.022 : 0.027));
  const exInnerPad = innerPad * 1.1;
  const exMaxW   = cardW - exInnerPad * 4;
  let exLines: string[] = [];
  let exBoxH = 0;

  if (hasEx) {
    ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    exLines = wrapText(ctx, `💡  ${explanation}`, exMaxW);
    // Cap at 4 lines max to prevent runaway boxes
    if (exLines.length > 4) exLines = [...exLines.slice(0, 3), exLines[3].slice(0, -1) + "…"];
    exBoxH = exLines.length * exFontSize * 1.65 + exInnerPad * 2;
  }

  const exBoxY = cardBottom - exBoxH - (hasEx ? innerPad : 0);

  // ── Word zone: space between label and explanation box ────────────────────
  const wordZoneTop    = cardY + innerPad * 3.5;
  const wordZoneBottom = hasEx ? exBoxY - innerPad * 1.5 : cardBottom - innerPad;
  const wordZoneMid    = (wordZoneTop + wordZoneBottom) / 2;

  if (isWide) {
    // ── Facebook: side-by-side ──────────────────────────────────────────────
    const wordFontSize = Math.floor(w * 0.072);
    const colW         = cardW * 0.36;
    const leftX        = cardX + cardW * 0.22;
    const rightX       = cardX + cardW * 0.78;
    const pillFontSize = Math.floor(w * 0.017);
    const pillPad      = w * 0.02;

    // Measure lines to vertically centre
    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const incLines = wrapText(ctx, incorrectWord, colW);
    const corLines = wrapText(ctx, correctWord, colW);
    const maxLines = Math.max(incLines.length, corLines.length);
    const wordsHeight = maxLines * wordFontSize * 1.25;
    const pillH = pillFontSize * 1.9;
    const blockH = pillH + innerPad * 0.8 + wordsHeight;
    const blockTop = wordZoneMid - blockH / 2;
    const pillY = blockTop + pillH / 2;
    const wordStartY = blockTop + pillH + innerPad * 0.8 + wordFontSize / 2;

    // Badges
    drawPill(ctx, leftX,  pillY, "✕  ຜິດ", pillFontSize, pillPad, "rgba(239,68,68,0.28)",   "#fca5a5");
    drawPill(ctx, rightX, pillY, "✓  ຖືກ",  pillFontSize, pillPad, "rgba(52,211,153,0.28)", "#6ee7b7");

    // Words
    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#fca5a5";
    incLines.forEach((line, i) => {
      const ly = wordStartY + i * wordFontSize * 1.25;
      ctx.fillText(line, leftX, ly);
      drawStrikethrough(ctx, line, leftX, ly, wordFontSize);
    });

    // Arrow
    ctx.font = `300 ${Math.floor(w * 0.042)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.fillText("→", w / 2, wordZoneMid);

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.fillStyle = "#ffffff";
    corLines.forEach((line, i) => {
      ctx.fillText(line, rightX, wordStartY + i * wordFontSize * 1.25);
    });

  } else {
    // ── Instagram / TikTok: stacked ──────────────────────────────────────────
    const wordFontSize = Math.floor(w * 0.096);
    const usableW      = cardW * 0.82;
    const pillFontSize = Math.floor(w * 0.024);
    const pillPad      = w * 0.025;

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const incLines = wrapText(ctx, incorrectWord, usableW);
    const corLines = wrapText(ctx, correctWord, usableW);
    const pillH    = pillFontSize * 1.9;
    const arrowH   = Math.floor(w * 0.05) * 1.3;
    const lineH    = wordFontSize * 1.3;
    const gapBetween = innerPad * 1.5;

    const totalH = (pillH + innerPad * 0.6 + incLines.length * lineH)
                 + gapBetween + arrowH + gapBetween
                 + (pillH + innerPad * 0.6 + corLines.length * lineH);

    let cursor = wordZoneMid - totalH / 2;

    // Incorrect
    const incPillY = cursor + pillH / 2;
    drawPill(ctx, w / 2, incPillY, "✕  ຜິດ", pillFontSize, pillPad, "rgba(239,68,68,0.28)", "#fca5a5");
    cursor += pillH + innerPad * 0.6;

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fca5a5";
    incLines.forEach((line, i) => {
      const ly = cursor + i * lineH + wordFontSize / 2;
      ctx.fillText(line, w / 2, ly);
      drawStrikethrough(ctx, line, w / 2, ly, wordFontSize);
    });
    cursor += incLines.length * lineH + gapBetween;

    // Arrow
    const arrowFontSize = Math.floor(w * 0.05);
    ctx.font = `300 ${arrowFontSize}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.fillText("↓", w / 2, cursor + arrowH / 2);
    cursor += arrowH + gapBetween;

    // Correct
    const corPillY = cursor + pillH / 2;
    drawPill(ctx, w / 2, corPillY, "✓  ຖືກ", pillFontSize, pillPad, "rgba(52,211,153,0.28)", "#6ee7b7");
    cursor += pillH + innerPad * 0.6;

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.fillStyle = "#ffffff";
    corLines.forEach((line, i) => {
      ctx.fillText(line, w / 2, cursor + i * lineH + wordFontSize / 2);
    });
  }

  // ── Explanation box (always fits because we reserved space) ───────────────
  if (hasEx && exLines.length > 0) {
    const exBoxX = cardX + innerPad * 2;
    const exBoxW = cardW - innerPad * 4;

    ctx.save();
    roundRect(ctx, exBoxX, exBoxY, exBoxW, exBoxH, w * 0.018);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.68)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    exLines.forEach((line, i) => {
      ctx.fillText(line, w / 2, exBoxY + exInnerPad + i * exFontSize * 1.65);
    });
  }

  // Restore clip
  ctx.restore();

  // ── Brand watermark (outside card, always visible) ────────────────────────
  const divY = cardBottom + (h - cardBottom) * 0.4;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(w * 0.36, divY);
  ctx.lineTo(w * 0.64, divY);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  const brandFontSize = Math.floor(w * 0.021);
  ctx.font = `600 ${brandFontSize}px 'Noto Sans', sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.32)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("laoswords.com", w / 2, cardBottom + (h - cardBottom) * 0.72);

  return canvas.toDataURL("image/png");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShareCardButton({ incorrectWord, correctWord, explanation }: Props) {
  const [activeFormat, setActiveFormat] = useState<Format | null>(null);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);
  const [open, setOpen]                 = useState(false);

  const handleGenerate = async (format: Format) => {
    setLoading(true);
    setActiveFormat(format);
    setPreviewUrl(null);
    try {
      const url = await generateCard(format, incorrectWord, correctWord, explanation);
      setPreviewUrl(url);
    } catch (e) {
      console.error("Card generation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl || !activeFormat) return;
    const filename = `laoswords-${incorrectWord}-${correctWord}-${activeFormat}.png`;

    // iOS Safari: data URL download not supported via <a download>
    // Open in new tab so user can long-press → Save Image
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
    if (isIOS) {
      const win = window.open();
      if (win) {
        win.document.write(`<img src="${previewUrl}" style="max-width:100%" />`);
        win.document.title = filename;
      }
      return;
    }

    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const PLATFORM_STYLES: Record<Format, string> = {
    facebook:  "bg-[#1877F2]",
    instagram: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    tiktok:    "bg-black",
  };
  const PLATFORM_ICONS: Record<Format, string> = {
    facebook: "f", instagram: "IG", tiktok: "TT",
  };

  return (
    <div className="border-t border-gray-100 pt-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#205781] to-[#4F959D] text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="break-words text-center">ສ້າງຮູບແຊ໌ Social Media</span>
        </button>
      ) : (
        <div className="space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">📐 ເລືອກຂະໜາດ</p>
            <button
              onClick={() => { setOpen(false); setPreviewUrl(null); setActiveFormat(null); }}
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm px-2 py-1"
            >
              ✕
            </button>
          </div>

          {/* Format grid */}
          <div className="grid grid-cols-3 gap-2">
            {(Object.entries(FORMAT_CONFIG) as [Format, typeof FORMAT_CONFIG[Format]][]).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => handleGenerate(key)}
                disabled={loading}
                className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 font-medium transition-all
                  ${activeFormat === key
                    ? "border-[#205781] bg-[#205781]/8 text-[#205781]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#205781]/40"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${PLATFORM_STYLES[key]}`}>
                  {PLATFORM_ICONS[key]}
                </span>
                <span className="text-[11px] font-semibold">{cfg.label}</span>
                <span className="text-[10px] text-gray-400 leading-tight">{cfg.desc}</span>
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-5 text-gray-400 text-sm">
              <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              ກຳລັງສ້າງຮູບ...
            </div>
          )}

          {/* Preview + download */}
          {previewUrl && !loading && (
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Social card preview"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ດາວໂຫຼດ / ບັນທຶກຮູບ
              </button>

              <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                📱 iPhone/iPad: ກົດ &quot;ດາວໂຫຼດ&quot; → ຈິກຮູບຄ້າງ → &quot;ບັນທຶກຮູບ&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
