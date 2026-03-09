import Image from "next/image";
import logo from "../../public/logo-rings.svg";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Image
        src={logo}
        alt=""
        width={64}
        height={64}
        className="animate-spin-slow opacity-20"
        style={{ filter: "invert(1)" }}
      />
    </div>
  );
}
