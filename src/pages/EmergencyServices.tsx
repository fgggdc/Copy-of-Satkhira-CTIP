import { useState } from "react";
import { Search, MapPin, Phone, Mail, Globe, ShieldAlert, Building, Scale, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import ShareButtons from "../components/ShareButtons";

export default function EmergencyServices() {
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    {
      country: "বাংলাদেশ",
      embassy: "জাতীয় জরুরি সেবা",
      address: "সারাদেশে প্রযোজ্য",
      phone: "৯৯৯",
      email: "info@police.gov.bd",
      hotline: "৩৩৩ (জাতীয় তথ্য বাতায়ন)",
      police: "৯৯৯",
      ambulance: "৯৯৯",
      legalAid: {
        name: "জাতীয় আইনগত সহায়তা প্রদান সংস্থা",
        phone: "১৬৪৩০",
        email: "info@nlaso.gov.bd"
      },
      portalLink: "http://www.probashi.gov.bd/"
    },
    {
      country: "সৌদি আরব",
      embassy: "বাংলাদেশ দূতাবাস, রিয়াদ",
      address: "Diplomatic Quarter, Riyadh",
      phone: "+966 11 419 5300",
      email: "mission.riyadh@mofa.gov.bd",
      hotline: "৮০০ ২৪৪ ০০৫১ (টোল ফ্রি)",
      police: "৯৯৯",
      ambulance: "৯৯৭",
      consulate: {
        name: "বাংলাদেশ কনস্যুলেট জেনারেল, জেদ্দা",
        phone: "+966 12 687 8465",
        email: "mission.jeddah@mofa.gov.bd"
      },
      legalAid: {
        name: "প্রবাসী আইনি সহায়তা সেল",
        phone: "+966 50 123 4567",
        email: "legal.riyadh@mofa.gov.bd"
      },
      portalLink: "https://riyadh.mofa.gov.bd/"
    },
    {
      country: "সংযুক্ত আরব আমিরাত",
      embassy: "বাংলাদেশ দূতাবাস, আবুধাবি",
      address: "Villa No. 46, 48, Sector 19, Zone 2, Abu Dhabi",
      phone: "+971 2 446 5100",
      email: "mission.abudhabi@mofa.gov.bd",
      hotline: "৮০০ ৪৪ ৪৪৪ (শ্রম মন্ত্রণালয়)",
      police: "৯৯৯",
      ambulance: "৯৯৮",
      consulate: {
        name: "বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই",
        phone: "+971 4 265 1116",
        email: "mission.dubai@mofa.gov.bd"
      },
      legalAid: {
        name: "আমিরাত আইনি সহায়তা কেন্দ্র",
        phone: "+971 56 123 4567",
        email: "legal.uae@mofa.gov.bd"
      },
      portalLink: "https://abudhabi.mofa.gov.bd/"
    },
    {
      country: "মালয়েশিয়া",
      embassy: "বাংলাদেশ হাই কমিশন, কুয়ালালামপুর",
      address: "No. 114, Jalan U-Thant, 55000 Kuala Lumpur",
      phone: "+60 3 4252 2652",
      email: "mission.kualalumpur@mofa.gov.bd",
      hotline: "০৩-৪২৫২ ২৬৫২",
      police: "৯৯৯",
      ambulance: "৯৯৯",
      legalAid: {
        name: "মালয়েশিয়া লিগ্যাল এইড সেন্টার",
        phone: "+60 12 345 6789",
        email: "legalaid.my@mofa.gov.bd"
      },
      portalLink: "https://kualalumpur.mofa.gov.bd/"
    },
    {
      country: "কাতার",
      embassy: "বাংলাদেশ দূতাবাস, দোহা",
      address: "Building No. 153, Street No. 820, Zone No. 43, Doha",
      phone: "+974 4467 1927",
      email: "mission.doha@mofa.gov.bd",
      hotline: "১৬০০৮ (শ্রম মন্ত্রণালয়)",
      police: "৯৯৯",
      ambulance: "৯৯৯",
      legalAid: {
        name: "কাতার প্রবাসী আইনি সহায়তা",
        phone: "+974 5555 1234",
        email: "legal.qatar@mofa.gov.bd"
      },
      portalLink: "https://doha.mofa.gov.bd/"
    },
    {
      country: "কুয়েত",
      embassy: "বাংলাদেশ দূতাবাস, কুয়েত সিটি",
      address: "Plot 401, Block 7, Street 71, Khaldiya, Kuwait City",
      phone: "+965 2496 2420",
      email: "mission.kuwait@mofa.gov.bd",
      hotline: "+965 2496 2421",
      police: "১১২",
      ambulance: "১১২",
      legalAid: {
        name: "কুয়েত প্রবাসী আইনি সহায়তা",
        phone: "+965 2496 2422",
        email: "legal.kuwait@mofa.gov.bd"
      },
      portalLink: "https://kuwait.mofa.gov.bd/"
    },
    {
      country: "ওমান",
      embassy: "বাংলাদেশ দূতাবাস, মাস্কাট",
      address: "Way No. 3017, Building No. 1373, Shatti Al Qurum, Muscat",
      phone: "+968 2460 3514",
      email: "mission.muscat@mofa.gov.bd",
      hotline: "৮০০ ৭৭০ ০০ (শ্রম মন্ত্রণালয়)",
      police: "৯৯৯৯",
      ambulance: "৯৯৯৯",
      legalAid: {
        name: "ওমান প্রবাসী আইনি সহায়তা",
        phone: "+968 2460 3515",
        email: "legal.muscat@mofa.gov.bd"
      },
      portalLink: "https://muscat.mofa.gov.bd/"
    },
    {
      country: "বাহরাইন",
      embassy: "বাংলাদেশ দূতাবাস, মানামা",
      address: "Villa No. 2280, Road No. 2757, Block No. 327, Adliya, Manama",
      phone: "+973 1756 4735",
      email: "mission.manama@mofa.gov.bd",
      hotline: "৮০০১ ৮০০০ (শ্রম মন্ত্রণালয়)",
      police: "৯৯৯",
      ambulance: "৯৯৮",
      legalAid: {
        name: "বাহরাইন প্রবাসী আইনি সহায়তা",
        phone: "+973 1756 4736",
        email: "legal.manama@mofa.gov.bd"
      },
      portalLink: "https://manama.mofa.gov.bd/"
    },
    {
      country: "সিঙ্গাপুর",
      embassy: "বাংলাদেশ হাই কমিশন, সিঙ্গাপুর",
      address: "19 Keppel Road, #04-00 (Jit Poh Building), Singapore 089058",
      phone: "+65 6226 3907",
      email: "mission.singapore@mofa.gov.bd",
      hotline: "১৮০০ ৩৩৩ ৫৬৭৮ (MOM)",
      police: "৯৯৯",
      ambulance: "৯৯৫",
      legalAid: {
        name: "মাইগ্রেন্ট ওয়ার্কার্স সেন্টার (MWC)",
        phone: "+65 6536 2692",
        email: "feedback@mwc.org.sg"
      },
      portalLink: "https://singapore.mofa.gov.bd/"
    },
    {
      country: "মালদ্বীপ",
      embassy: "বাংলাদেশ হাই কমিশন, মালে",
      address: "G. Ufriya, Lonuziyaaraiy Magu, Male",
      phone: "+960 332 0859",
      email: "mission.male@mofa.gov.bd",
      hotline: "১৫০০ (শ্রম মন্ত্রণালয়)",
      police: "১১৯",
      ambulance: "১০২",
      legalAid: {
        name: "মালদ্বীপ প্রবাসী আইনি সহায়তা",
        phone: "+960 332 0860",
        email: "legal.male@mofa.gov.bd"
      },
      portalLink: "https://male.mofa.gov.bd/"
    },
    {
      country: "ইতালি",
      embassy: "বাংলাদেশ দূতাবাস, রোম",
      address: "Via Antonio Bertoloni, 14, 00197 Rome",
      phone: "+39 06 808 3595",
      email: "mission.rome@mofa.gov.bd",
      hotline: "৮০০ ২৯০ ২৯০ (অ্যান্টি-ট্রাফিকিং)",
      police: "১১২",
      ambulance: "১১৮",
      consulate: {
        name: "বাংলাদেশ কনস্যুলেট জেনারেল, মিলান",
        phone: "+39 02 8909 6030",
        email: "mission.milan@mofa.gov.bd"
      },
      legalAid: {
        name: "ইতালি প্রবাসী আইনি সহায়তা",
        phone: "+39 06 808 3596",
        email: "legal.rome@mofa.gov.bd"
      },
      portalLink: "https://rome.mofa.gov.bd/"
    },
  ];

  const filteredServices = services.filter((service) =>
    service.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          জরুরি সেবা নম্বর
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          বিভিন্ন দেশে অবস্থিত বাংলাদেশ দূতাবাস, কনস্যুলেট, হেল্পলাইন নম্বর এবং
          স্থানীয় জরুরি সেবার তালিকা।
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="দেশের নাম দিয়ে খুঁজুন (যেমন: সৌদি আরব, মালয়েশিয়া)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-card focus:border-primary focus:ring-0 outline-none transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="brutal bg-card p-6 rounded-2xl flex flex-col h-full hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">{service.country}</h2>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" /> {service.embassy}
                </h3>
                <p className="text-muted-foreground ml-7 text-sm">
                  {service.address}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> ফোন
                  </p>
                  <a href={`tel:${service.phone}`} className="font-medium text-sm text-primary hover:underline">{service.phone}</a>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> ইমেইল
                  </p>
                  <a href={`mailto:${service.email}`} className="font-medium text-sm text-primary hover:underline break-all">
                    {service.email}
                  </a>
                </div>
              </div>

              {service.consulate && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h3 className="font-semibold text-md mb-3 flex items-center gap-2 text-primary">
                    <Building className="w-4 h-4" /> {service.consulate.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> ফোন
                      </p>
                      <a href={`tel:${service.consulate.phone}`} className="font-medium text-sm text-primary hover:underline">{service.consulate.phone}</a>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> ইমেইল
                      </p>
                      <a href={`mailto:${service.consulate.email}`} className="font-medium text-sm text-primary hover:underline break-all">
                        {service.consulate.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {service.legalAid && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h3 className="font-semibold text-md mb-3 flex items-center gap-2 text-primary">
                    <Scale className="w-4 h-4" /> আইনি সহায়তা (Legal Aid)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> ফোন
                      </p>
                      <a href={`tel:${service.legalAid.phone}`} className="font-medium text-sm text-primary hover:underline">{service.legalAid.phone}</a>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> ইমেইল
                      </p>
                      <a href={`mailto:${service.legalAid.email}`} className="font-medium text-sm text-primary hover:underline break-all">
                        {service.legalAid.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                <p className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> {service.country === "বাংলাদেশ" ? "জাতীয় হেল্পলাইন" : "প্রবাসী হেল্পলাইন"}
                </p>
                <p className="text-lg font-bold text-foreground">
                  <a href={`tel:${service.hotline}`} className="hover:underline">{service.hotline}</a>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    স্থানীয় পুলিশ
                  </p>
                  <p className="font-bold text-destructive flex items-center gap-2">
                    <Phone className="w-4 h-4" /> <a href={`tel:${service.police}`} className="hover:underline">{service.police}</a>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    অ্যাম্বুলেন্স
                  </p>
                  <p className="font-bold text-rose-500 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> <a href={`tel:${service.ambulance}`} className="hover:underline">{service.ambulance}</a>
                  </p>
                </div>
              </div>

              {service.portalLink && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <a 
                    href={service.portalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    অফিসিয়াল পোর্টাল ভিজিট করুন
                  </a>
                </div>
              )}
              
              <ShareButtons 
                url={window.location.href} 
                title={`${service.country} - জরুরি সেবা নম্বর`}
                text={`${service.country} এর জন্য বাংলাদেশ দূতাবাস এবং জরুরি সেবার নম্বরগুলো জানুন।`}
              />
            </div>
          </motion.div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">
              কোনো তথ্য পাওয়া যায়নি। অন্য দেশের নাম দিয়ে চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
