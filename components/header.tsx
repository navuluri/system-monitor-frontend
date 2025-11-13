import Image from "next/image";

export default function Header() {
  return (
    <header className="flex top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <Image
        src="/images/HPE-logo-full-clr-pos-rgb.svg"
        alt="Logo"
        width={80}
        height={80}
        className="ml-auto"
      />
    </header>
  );
}
