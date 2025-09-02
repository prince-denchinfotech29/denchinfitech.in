import Link from "next/link";
import { NavItem } from "@/components/pages/header/footer/types";

interface Props {
  navList: NavItem[];
  title?: string;
}

export default function ServicesSection({ navList, title }: Props) {
  return (
    <div>
      <h4 className="footer-title">{title || "Services"}</h4>
      <div className="footer-underline" />

      <div className="footer-section space-y-3">
        <ul className="footer-section">
          {navList.length > 0 ? (
            navList.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`}>{item.name}</Link>
              </li>
            ))
          ) : (
            <li>No services found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
