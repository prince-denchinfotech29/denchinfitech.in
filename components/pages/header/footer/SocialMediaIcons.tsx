// components/footer/AddressSection.tsx

import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Setting, SocialMedia } from "./types";

interface Props {
  setting: Setting;
  socialMedia?: SocialMedia;
}

export default function AddressSection({ setting, socialMedia }: Props) {
  const formattedAddress = setting.footer_address?.replace(/\r\n/g, "<br/>") || "";
  return (
    <div>
      <h4 className="footer-title">{setting.footer_col4_title || "Address"}</h4>
      <div className="footer-underline" />

      <div className="footer-section">
        <div className="flex items-start mb-2">
          <MapPin className="h-5 w-5 mr-2 mt-1" />
          <p dangerouslySetInnerHTML={{ __html: formattedAddress }} />
        </div>
        <div className="flex items-center mb-2">
          <Phone className="mr-2" size={18} />
          <p>{setting.footer_phone}</p>
        </div>
        <div className="flex items-center mb-2">
          <Mail className="mr-2" size={18} />
          <p>info[at]denchinfotech[dot]in</p>
        </div>
      </div>

      <div className="flex gap-4">
        {socialMedia?.instagram && (
          <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Button>
          </a>
        )}
        {socialMedia?.facebook && (
          <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Button>
          </a>
        )}
        {socialMedia?.twitter && (
          <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Button>
          </a>
        )}
        {socialMedia?.linkedin && (
          <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
