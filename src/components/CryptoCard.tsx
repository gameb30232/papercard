import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { forwardRef, CSSProperties } from "react";
import { CardData } from "@/types";

interface CryptoCardProps extends CardData {
  variant: "front" | "back";
}

// Pure function to generate mnemonic spaces
const generateMnemonicSpaces = (length: 12 | 24) =>
  Array.from({ length }, (_, i) => i + 1);

// Pure function to format address
const formatAddress = (address: string) => ({
  firstHalf: address.slice(0, Math.ceil(address.length / 2)),
  secondHalf: address.slice(Math.ceil(address.length / 2)),
});

export const CryptoCard = forwardRef<HTMLDivElement, CryptoCardProps>(
  (
    { chain, address, orientation, mnemonicLength, backgroundImage, variant },
    ref,
  ) => {
    const mnemonicSpaces = generateMnemonicSpaces(mnemonicLength ?? 24);
    const { firstHalf, secondHalf } = formatAddress(address);
    const isVertical = orientation === "vertical";

    const renderFront = () => (
      <>
        {backgroundImage ? (
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]"
            style={{ "--color": chain.color } as CSSProperties}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12" />

        <div
          className={cn(
            "relative flex h-full z-10",
            isVertical
              ? "flex-col items-center"
              : "items-start justify-between",
          )}
        >
          <div className="flex flex-col relative z-20">
            <div className="flex items-center gap-3 mb-2">
              {chain.logo && (
                <img
                  src={chain.logo}
                  alt={`${chain.name} logo`}
                  className="w-6 h-6"
                />
              )}
              <h2 className="text-white font-bold text-2xl tracking-tight">
                {chain.name}
              </h2>
            </div>
            <p className="text-gray-400 text-sm font-mono tracking-wider pl-9">
              {chain.symbol}
            </p>
          </div>

          <div
            className={cn(
              "relative z-10 flex flex-col items-center",
              isVertical ? "mt-auto" : "",
            )}
          >
            <div className="flex flex-col items-center mb-2">
              <div
                className={cn(
                  "text-center",
                  isVertical ? "w-[110px]" : "w-[100px]",
                )}
              >
                <p className="text-gray-400 text-[8px] font-mono leading-tight break-all">
                  {firstHalf}
                  <br />
                  {secondHalf}
                </p>
              </div>
            </div>

            <div
              className="bg-white/90 backdrop-blur-sm rounded-lg p-2
                       shadow-[0_0_15px_rgba(0,0,0,0.1)]
                       transition-transform duration-300
                       group-hover:scale-[1.02]"
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  isVertical ? "w-[86px] h-[86px]" : "w-[76px] h-[76px]",
                )}
              >
                <QRCodeSVG
                  value={address}
                  size={isVertical ? 86 : 76}
                  level="L"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );

    const renderBack = () => (
      <div className="relative h-full">
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1 px-1">
            <h3 className="text-white/90 text-[11px] font-medium">
              Recovery Phrase
            </h3>
            <span className="text-gray-400 text-[9px]">
              {mnemonicLength} words
            </span>
          </div>

          <div
            className={cn(
              "grid gap-y-[5px] gap-x-3 flex-1",
              isVertical
                ? mnemonicLength === 24
                  ? "grid-cols-2 text-[9px] mt-0"
                  : "grid-cols-2 text-xs mt-1"
                : mnemonicLength === 24
                  ? "grid-cols-4 text-[10px] mt-1"
                  : "grid-cols-3 text-xs mt-2",
              "font-mono",
            )}
          >
            {mnemonicSpaces.map((num) => (
              <div key={num} className="relative">
                <div className="absolute -left-2.5 text-gray-500 text-[8px]">
                  {num}
                </div>
                <div className="w-full border-b border-gray-700/30">
                  <span className="text-transparent select-none">
                    ________________
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1 text-center">
            <p className="text-gray-400 text-[7px]">
              Write your recovery phrase here and keep it safe
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "crypto-card",
          "rounded-xl p-6 relative overflow-hidden transition-all duration-300",
          "bg-gradient-to-br from-gray-900 to-gray-800",
          "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
          "backdrop-blur-xl backdrop-saturate-150",
          "hover:scale-105",
          isVertical ? "w-[53.98mm] h-[85.60mm]" : "w-[85.60mm] h-[53.98mm]",
        )}
      >
        {variant === "front" ? renderFront() : renderBack()}
      </div>
    );
  },
);

CryptoCard.displayName = "CryptoCard";
