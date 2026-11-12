import {
  BotanicalShieldCard,
  SupportHelpCard,
} from "../checkout/AddressComponents";

export default function CartTrustCards() {
  return (
    <div className="flex flex-col gap-3.5">
      <BotanicalShieldCard />
      <SupportHelpCard />
    </div>
  );
}
