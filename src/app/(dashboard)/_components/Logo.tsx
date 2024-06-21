import Image from "next/image";

type Props = {};

export default function Logo({}: Props) {
  return <Image height={100} width={100} alt="logo" src="/logo.svg" />;
}
