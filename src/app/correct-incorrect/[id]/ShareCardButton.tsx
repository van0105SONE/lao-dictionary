"use client";

import { useState } from "react";

interface Props {
  incorrectWord: string;
  correctWord: string;
  explanation: string | null;
}

type Format = "facebook" | "instagram" | "tiktok";

const FORMAT_CONFIG: Record<Format, { label: string; icon: string; w: number; h: number; desc: string }> = {
  facebook: {
    label: "Facebook",
    icon: "f",
    w: 1200,
    h: 630,
    desc: "1200 × 630",
  },
  instagram: {
    label: "Instagram",
    icon: "in",
    w: 1080,
    h: 1080,
    desc: "1080 × 1080",
  },
  tiktok: {
    label: "TikTok",
    icon: "tt",
    w: 1080,
    h: 1920,
    desc: "1080 × 1920",
  },
};

// ─── Canvas drawing helper ──────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
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

/** Wrap text and return array of lines */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const chars = [...text]; // Lao is character-based, no spaces needed
  const lines: string[] = [];
  let current = "";
  for (const ch of chars) {
    const test = current + ch;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = ch;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawStrikethrough(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number
) {
  const w = ctx.measureText(text).width;
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y - fontSize * 0.1);
  ctx.lineTo(x + w / 2, y - fontSize * 0.1);
  ctx.strokeStyle = "rgba(220,38,38,0.8)";
  ctx.lineWidth = Math.max(2, fontSize * 0.06);
  ctx.stroke();
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

  const isWide = w > h;      // Facebook
  const isSquare = w === h;  // Instagram
  // isVertical = TikTok

  // ── Background gradient ──────────────────────────────────────────────────
  const grad = ctx.createLinearGradient(0, 0, w * 0.6, h);
  grad.addColorStop(0, "#0f2942");
  grad.addColorStop(0.55, "#205781");
  grad.addColorStop(1, "#4F959D");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // ── Decorative circles ───────────────────────────────────────────────────
  const drawCircle = (cx: number, cy: number, r: number, alpha: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  };
  drawCircle(w * 0.85, h * -0.05, w * 0.35, 0.04);
  drawCircle(w * -0.1, h * 1.05, w * 0.4, 0.035);
  drawCircle(w * 0.5, h * 0.5, w * 0.55, 0.025);

  // ── Decorative dot grid ──────────────────────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  const dotSpacing = Math.floor(w / 20);
  for (let dx = dotSpacing; dx < w; dx += dotSpacing) {
    for (let dy = dotSpacing; dy < h; dy += dotSpacing) {
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Shared helpers ───────────────────────────────────────────────────────
  const drawPill = (
    cx: number, cy: number,
    label: string,
    bg: string, textColor: string,
    pillFontSize: number
  ) => {
    ctx.font = `700 ${pillFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const tw = ctx.measureText(label).width;
    const pillW = tw + pillFontSize * 1.6;
    const pillH = pillFontSize * 1.9;
    roundRect(ctx, cx - pillW / 2, cy - pillH / 2, pillW, pillH, pillH / 2);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, cx, cy);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FACEBOOK — landscape 1200 × 630
  // Pixel-exact zones: label | words (side-by-side) | separator | explanation | brand
  // ═══════════════════════════════════════════════════════════════════════════
  if (isWide) {
    const margin = h * 0.09;
    const innerTop = margin;
    const innerBot = h - margin;
    const totalH = innerBot - innerTop;

    const hasEx = !!explanation;
    const labelH  = totalH * 0.13;
    const wordsH  = totalH * (hasEx ? 0.43 : 0.60);
    const sepH    = totalH * 0.04;
    const exH     = hasEx ? totalH * 0.30 : 0;
    const brandH  = totalH * 0.10;

    let cursor = innerTop;

    // ── Label ──
    const labelFontSize = Math.floor(h * 0.038);
    ctx.font = `600 ${labelFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ຄຳຜິດ  →  ຄຳຖືກ", w / 2, cursor + labelH / 2);
    cursor += labelH;

    // ── Words (side-by-side) ──
    const wordFontSize = Math.floor(h * 0.115);
    const pillFontSize = Math.floor(h * 0.042);
    const colW         = w * 0.32;
    const leftX        = w * 0.24;
    const rightX       = w * 0.76;
    const wordsCenter  = cursor + wordsH / 2;

    drawPill(leftX,  wordsCenter - wordFontSize * 0.9, "✕  ຜິດ", "rgba(239,68,68,0.3)",  "#fca5a5", pillFontSize);
    drawPill(rightX, wordsCenter - wordFontSize * 0.9, "✓  ຖືກ", "rgba(52,211,153,0.3)", "#6ee7b7", pillFontSize);

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const incLines = wrapText(ctx, incorrectWord, colW);
    ctx.fillStyle = "#fca5a5";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    incLines.forEach((line, i) => {
      const ly = wordsCenter + i * wordFontSize * 1.2;
      ctx.fillText(line, leftX, ly);
      drawStrikethrough(ctx, line, leftX, ly, wordFontSize);
    });

    ctx.font = `300 ${Math.floor(h * 0.06)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("→", w / 2, wordsCenter + wordFontSize * 0.15);

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const corLines = wrapText(ctx, correctWord, colW);
    ctx.fillStyle = "#ffffff";
    corLines.forEach((line, i) => {
      ctx.fillText(line, rightX, wordsCenter + i * wordFontSize * 1.2);
    });
    cursor += wordsH;

    // ── Separator ──
    const sepY = cursor + sepH / 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, sepY);
    ctx.lineTo(w * 0.9, sepY);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    cursor += sepH;

    // ── Explanation ──
    if (hasEx && exH > 0) {
      const exBoxX = w * 0.06;
      const exBoxW = w * 0.88;
      const exBoxY = cursor + exH * 0.04;
      const exBoxH = exH * 0.90;

      // Adaptive font: shrink until text fits inside the box
      let exFontSize = Math.floor(h * 0.052);
      ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
      let exLines = wrapText(ctx, `💡  ${explanation}`, exBoxW - h * 0.08);
      while (exLines.length * exFontSize * 1.5 > exBoxH - h * 0.05 && exFontSize > 20) {
        exFontSize -= 2;
        ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
        exLines = wrapText(ctx, `💡  ${explanation}`, exBoxW - h * 0.08);
      }

      // Frosted box
      ctx.save();
      roundRect(ctx, exBoxX, exBoxY, exBoxW, exBoxH, h * 0.025);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Amber left accent bar
      ctx.save();
      roundRect(ctx, exBoxX, exBoxY + exBoxH * 0.1, 4, exBoxH * 0.8, 2);
      ctx.fillStyle = "rgba(251,191,36,0.7)";
      ctx.fill();
      ctx.restore();

      // Text vertically centred inside box
      const textBlockH = exLines.length * exFontSize * 1.5;
      const textStartY = exBoxY + (exBoxH - textBlockH) / 2;
      ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      exLines.forEach((line, i) => {
        ctx.fillText(line, exBoxX + h * 0.05, textStartY + i * exFontSize * 1.5);
      });

      cursor += exH;
    }

    // ── Brand ──
    const brandFontSize = Math.floor(h * 0.036);
    ctx.font = `600 ${brandFontSize}px 'Noto Sans', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("laoswords.com", w / 2, cursor + brandH / 2);

  } else {
    // ═══════════════════════════════════════════════════════════════════════
    // INSTAGRAM (1:1) & TIKTOK (9:16) — stacked layout
    // ═══════════════════════════════════════════════════════════════════════
    const pad   = w * 0.07;
    const cardX = pad;
    const cardY = h * 0.12;
    const cardW = w - pad * 2;
    const cardH = h - cardY * 1.5;

    ctx.save();
    roundRect(ctx, cardX, cardY, cardW, cardH, w * 0.04);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    const labelFontSize = Math.floor(w * 0.022);
    ctx.font = `600 ${labelFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ຄຳຜິດ  →  ຄຳຖືກ", w / 2, cardY + w * 0.045);

    const wordFontSize  = Math.floor(w * 0.1);
    const pillFontSize2 = Math.floor(w * 0.025);
    const wordY = cardY + cardH * 0.3;
    const usableW  = cardW * 0.8;
    const centerX  = w / 2;
    const incY = isSquare ? wordY - wordFontSize * 0.6 : wordY - wordFontSize * 0.8;
    const corY = isSquare ? wordY + wordFontSize * 2.2 : wordY + wordFontSize * 2.6;

    drawPill(centerX, incY - wordFontSize * 1.1, "✕  ຜິດ", "rgba(239,68,68,0.25)", "#fca5a5", pillFontSize2);

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const incLines = wrapText(ctx, incorrectWord, usableW);
    ctx.fillStyle = "#fca5a5";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    incLines.forEach((line, i) => {
      const ly = incY + i * wordFontSize * 1.3;
      ctx.fillText(line, centerX, ly);
      drawStrikethrough(ctx, line, centerX, ly, wordFontSize);
    });

    const arrowY = (incY + incLines.length * wordFontSize * 1.3 + corY - wordFontSize * 1.1) / 2;
    ctx.font = `300 ${Math.floor(w * 0.052)}px sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("↓", centerX, arrowY);

    drawPill(centerX, corY - wordFontSize * 1.1, "✓  ຖືກ", "rgba(52,211,153,0.25)", "#6ee7b7", pillFontSize2);

    ctx.font = `700 ${wordFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
    const corLines = wrapText(ctx, correctWord, usableW);
    ctx.fillStyle = "#ffffff";
    corLines.forEach((line, i) => {
      ctx.fillText(line, centerX, corY + i * wordFontSize * 1.3);
    });

    if (explanation) {
      const exFontSize = Math.floor(w * 0.026);
      const exPad = w * 0.045;
      const exBoxW = cardW - exPad * 2;
      const exBoxX = cardX + exPad;
      const wordsBottom = cardY + cardH * (isSquare ? 0.72 : 0.7);

      ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
      const exLines = wrapText(ctx, `💡 ${explanation}`, exBoxW - exPad);
      const exBoxH = exLines.length * exFontSize * 1.6 + exPad * 2;
      const exBoxY = wordsBottom;

      ctx.save();
      roundRect(ctx, exBoxX, exBoxY, exBoxW, exBoxH, w * 0.02);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.font = `italic ${exFontSize}px 'Noto Sans Lao', 'Noto Sans', sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      exLines.forEach((line, i) => {
        ctx.fillText(line, w / 2, exBoxY + exPad + i * exFontSize * 1.6);
      });
    }

    const divY = h - h * 0.1;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, divY);
    ctx.lineTo(w * 0.65, divY);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const brandFontSize = Math.floor(w * 0.022);
    ctx.font = `600 ${brandFontSize}px 'Noto Sans', sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("laoswords.com", w / 2, h - h * 0.06);
  }

  return canvas.toDataURL("image/png");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShareCardButton({ incorrectWord, correctWord, explanation }: Props) {
  const [activeFormat, setActiveFormat] = useState<Format | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenerate = async (format: Format) => {
    setLoading(true);
    setActiveFormat(format);
    setPreviewUrl(null);
    try {
      const url = await generateCard(format, incorrectWord, correctWord, explanation);
      setPreviewUrl(url);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl || !activeFormat) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `laoswords-${incorrectWord}-${correctWord}-${activeFormat}.png`;
    a.click();
  };

  return (
    <div className="border-t border-gray-100 pt-6">
      {/* Toggle button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#205781] to-[#4F959D] text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          ສ້າງຮູບແຊ໌ Social Media
        </button>
      ) : (
        <div className="space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">ເລືອກຂະໜາດ</p>
            <button
              onClick={() => { setOpen(false); setPreviewUrl(null); setActiveFormat(null); }}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
            >
              ✕ ປິດ
            </button>
          </div>

          {/* Format buttons */}
          <div className="grid grid-cols-3 gap-3">
            {(Object.entries(FORMAT_CONFIG) as [Format, typeof FORMAT_CONFIG[Format]][]).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => handleGenerate(key)}
                disabled={loading}
                className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border-2 font-medium text-xs transition-all
                  ${activeFormat === key
                    ? "border-[#205781] bg-[#205781]/8 text-[#205781]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#205781]/40 hover:bg-gray-50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {/* Platform icon */}
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold
                  ${key === "facebook" ? "bg-[#1877F2]" : key === "instagram" ? "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]" : "bg-black"}`}>
                  {key === "facebook" ? "f" : key === "instagram" ? "IG" : "TT"}
                </span>
                <span>{cfg.label}</span>
                <span className="text-[10px] text-gray-400">{cfg.desc}</span>
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-6 text-gray-400 text-sm">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              ກຳລັງສ້າງຮູບ...
            </div>
          )}

          {/* Preview */}
          {previewUrl && !loading && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Social card preview"
                  className="w-full h-auto max-h-72 object-contain"
                />
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors shadow-sm active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ດາວໂຫຼດຮູບ ({FORMAT_CONFIG[activeFormat!].desc})
              </button>

              <p className="text-center text-[11px] text-gray-400">
                ດາວໂຫຼດແລ້ວ ນຳໄປໂພສໃສ່ {FORMAT_CONFIG[activeFormat!].label} ໄດ້ເລີ້ຍ 🎉
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
