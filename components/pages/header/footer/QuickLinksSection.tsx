// components/footer/QuickLinksSection.tsx

import Link from "next/link";

interface Props {
  title?: string;
}

export default function QuickLinksSection({ title }: Props) {
  return (
    <div>
      <h4 className="footer-title">{title || "Quick Links"}</h4>
      <div className="footer-underline" />
      <ul className="footer-section">
        <li><Link href="/about">About Dench Infotech</Link></li>
        <li><Link href="/why-us">Why Dench Infotech</Link></li>
        <li><Link href="/careers">Careers@Dench Infotech</Link></li>
        <li><Link href="/contact">Contact Dench Infotech</Link></li>
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        <li><Link href="/portfolio">Portfolio</Link></li>
      </ul>
    </div>
  );
}
