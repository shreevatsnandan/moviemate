import Home from "@/app/(customer)/home/page";
import { metaObject } from "@/config/site";

export const metadata = {
  ...metaObject("Home"),
};

export default function CustomerPage() {
  return (
    <>
      <Home />
    </>
  );
}
