import { AppSetting } from "@/types/app_setting";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

interface ContactUsProps {
    appSetting: AppSetting;
}

const CreateSocialMediaIcon = (platform: string) => {
    switch (platform) {
        case "INSTAGRAM":
            return <Instagram className="w-5 h-5" />;
        case "FACEBOOK":
            return <Facebook className="w-5 h-5" />;
        case "TIKTOK":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                    fill="currentColor"
                >
                    <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
                </svg>
            );
        case "YOUTUBE":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                    fill="currentColor"
                >
                    <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
                </svg>
            );
        case "TWITTER":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width={20}
                    height={20}
                    fill="currentColor"
                >
                    <path d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z" />
                </svg>
            );
        // Add more platforms as needed
        default:
    }
};

export default function ContactUs({ appSetting }: ContactUsProps) {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-[#B46B30] font-semibold tracking-wider uppercase">
                                Hubungi Kami
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2A1E12] mt-2">
                                Kunjungi Outlet <br />
                                <span className="text-[#B46B30]">
                                    Nasywa Cake & Bakery
                                </span>
                            </h2>
                            <p className="text-gray-600 mt-4 leading-relaxed">
                                Kami selalu senang mendengar dari Anda. Hubungi
                                kami untuk pemesanan, pertanyaan, atau sekadar
                                menyapa.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FFFCF7] rounded-full flex items-center justify-center shrink-0 text-[#B46B30]">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2A1E12] mb-1">
                                        Alamat
                                    </h4>
                                    <p className="text-gray-600">
                                        RT.03/RW.03, Kesambi, Mejobo, Kudus,
                                        Jawa Tengah
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FFFCF7] rounded-full flex items-center justify-center shrink-0 text-[#B46B30]">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2A1E12] mb-1">
                                        WhatsApp
                                    </h4>
                                    <a
                                        href={`https://wa.me/${appSetting?.whatsapp_number}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-600 hover:text-[#B46B30] transition-colors"
                                    >
                                        {appSetting?.whatsapp_number ||
                                            "+62 812 3456 7890"}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FFFCF7] rounded-full flex items-center justify-center shrink-0 text-[#B46B30]">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2A1E12] mb-1">
                                        Jam Operasional
                                    </h4>
                                    <p className="text-gray-600">
                                        {appSetting?.time_operational}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h4 className="font-bold text-[#2A1E12] mb-4">
                                Ikuti Kami
                            </h4>
                            <div className="flex gap-4">
                                {appSetting?.social_media.length > 0 &&
                                    appSetting.social_media.map(
                                        (social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-10 h-10 bg-[#FFFCF7] rounded-full flex items-center justify-center text-[#B46B30] hover:bg-[#B46B30] hover:text-white transition-colors"
                                            >
                                                {CreateSocialMediaIcon(
                                                    social.platform
                                                )}
                                            </a>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[400px] lg:h-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.469016869098!2d110.9012401!3d-6.8342326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c59e1dd76875%3A0x8585d8c6c0e6a29f!2sRoti%20Nasywa!5e0!3m2!1sid!2sid!4v1765118968988!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
