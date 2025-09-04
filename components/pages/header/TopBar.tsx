'use client';

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

interface TopBarData {
  top_bar_email?: string;
  top_bar_phone?: string;
}

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

interface TopNavProps {
  topBarData?: TopBarData;
  socialLinks?: SocialLinks;
}

export default function TopNav({ topBarData, socialLinks }: TopNavProps) {
  if (!topBarData) return null;

  const formattedEmail = useMemo(() => {
    return topBarData.top_bar_email
      ?.replace(/\[at\]/g, '@')
      ?.replace(/\[dot\]/g, '.')
      .trim();
  }, [topBarData.top_bar_email]);

  return (
    <div className="text-white text-sm py-2 bg-brand-50">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div className="flex gap-4">
          {socialLinks?.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          )}
          {socialLinks?.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          )}
          {socialLinks?.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          )}
          {socialLinks?.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex gap-6">
          {formattedEmail && (
            <a href={`mailto:${formattedEmail}`} className="text-white">
              {formattedEmail}
            </a>
          )}
          {topBarData.top_bar_phone && (
            <a href={`tel:${topBarData.top_bar_phone}`} className="text-white">
              {topBarData.top_bar_phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
