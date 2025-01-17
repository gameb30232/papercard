import { cn } from "@/lib/utils";
import { APP_SETTINGS, THEME } from "@/config";
import { generateMnemonicSpaces } from "@/features/card-generator/utils/card";
import type { MnemonicGridProps } from "@/types/card";
import { MnemonicSpace } from "@/features/card-generator/MnemonicSpace";

export const MnemonicGrid = ({
  mnemonicLength,
  isVertical,
}: MnemonicGridProps) => (
  <div
    className={cn(
      "grid gap-y-[5px] gap-x-3 flex-1",
      isVertical
        ? mnemonicLength === APP_SETTINGS.MNEMONIC.LONG
          ? "grid-cols-2 text-[9px] mt-0"
          : "grid-cols-2 text-xs mt-1"
        : mnemonicLength === APP_SETTINGS.MNEMONIC.LONG
          ? "grid-cols-4 text-[10px] mt-1"
          : "grid-cols-3 text-xs mt-2",
      THEME.typography.symbol.family
    )}
  >
    {generateMnemonicSpaces(mnemonicLength).map((num) => (
      <MnemonicSpace key={num} number={num} />
    ))}
  </div>
);