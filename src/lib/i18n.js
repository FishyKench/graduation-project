import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Common
          language: "Language",
          english: "English",
          arabic: "Arabic",
          signIn: "Sign In",
          register: "Register",
          home: "Home",
          aboutUs: "About Us",
          services: "Services",
          announcements: "Announcements",
          contact: "Contact Us",
          search: "Search...",
          welcome: "Welcome",
          profile: "Profile",
          settings: "Settings",
          logOut: "Log out",
          applications: "Applications",
          loading: "Loading...",
          save: "Save Changes",
          saving: "Saving...",

          // Landing Page
          "hero.title": "Make a Difference",
          "hero.subtitle":
            "Join our community of volunteers and create positive change in Saudi Arabia",
          startJourney: "Start Your Journey",
          "mission.title": "Our Mission",
          "mission.text":
            "Volunect is dedicated to fostering meaningful connections between organizations and volunteers. We believe in the power of community service to transform both individuals and society.",
          "whyChoose.title": "Why Choose Us",
          "whyChoose.text":
            "We offer a diverse range of opportunities tailored to different skills and interests. Our platform makes it easy to find and apply for positions that match your passion.",
          "discover.title": "Discover Opportunities",
          learnMore: "Learn More",
          "impact.title": "Ready to Make an Impact?",
          "impact.subtitle":
            "Join our growing community and start making a difference today",
          getStarted: "Get Started",
          contactUs: "Contact Us",

          // Footer
          "footer.rights": "All rights reserved",
          "footer.privacy": "Privacy Policy",
          "footer.terms": "Terms of Service",

          // Legal Pages
          "Last updated": "Last updated",
          "Information We Collect": "Information We Collect",
          "We collect information that you provide directly to us when you":
            "We collect information that you provide directly to us when you",
          "Create an account": "Create an account",
          "Fill out your profile": "Fill out your profile",
          "Apply for opportunities": "Apply for opportunities",
          "Contact us": "Contact us",
          "How We Use Your Information": "How We Use Your Information",
          "We use the information we collect to":
            "We use the information we collect to",
          "Provide and improve our services":
            "Provide and improve our services",
          "Match volunteers with opportunities":
            "Match volunteers with opportunities",
          "Communicate with you about opportunities":
            "Communicate with you about opportunities",
          "Ensure platform security": "Ensure platform security",
          "Information Sharing": "Information Sharing",
          "We do not sell your personal information. We share your information only with":
            "We do not sell your personal information. We share your information only with",
          "Organizations you apply to volunteer with":
            "Organizations you apply to volunteer with",
          "Service providers who assist our operations":
            "Service providers who assist our operations",
          "When required by law": "When required by law",
          "If you have any questions about this Privacy Policy, please contact us at":
            "If you have any questions about this Privacy Policy, please contact us at",
          "1. Acceptance of Terms": "1. Acceptance of Terms",
          "By accessing and using Volunect, you agree to be bound by these Terms of Service and all applicable laws and regulations.":
            "By accessing and using Volunect, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
          "2. User Responsibilities": "2. User Responsibilities",
          "You agree to": "You agree to",
          "Provide accurate and complete information":
            "Provide accurate and complete information",
          "Maintain the security of your account":
            "Maintain the security of your account",
          "Not misuse the platform or its services":
            "Not misuse the platform or its services",
          "Comply with all local laws and regulations":
            "Comply with all local laws and regulations",
          "3. Organization Guidelines": "3. Organization Guidelines",
          "Organizations using Volunect must":
            "Organizations using Volunect must",
          "Provide accurate opportunity descriptions":
            "Provide accurate opportunity descriptions",
          "Maintain professional conduct with volunteers":
            "Maintain professional conduct with volunteers",
          "Comply with all applicable labor laws":
            "Comply with all applicable labor laws",
          "Respect volunteer privacy and data":
            "Respect volunteer privacy and data",
          "4. Intellectual Property": "4. Intellectual Property",
          "All content and materials available on Volunect are protected by intellectual property rights. You may not use, reproduce, or distribute any content without our express permission.":
            "All content and materials available on Volunect are protected by intellectual property rights. You may not use, reproduce, or distribute any content without our express permission.",
          "5. Contact": "5. Contact",
          "For any questions regarding these Terms of Service, please contact us at":
            "For any questions regarding these Terms of Service, please contact us at",

          // Service Page Features
          "Hands-on industry experience": "Hands-on industry experience",
          "Professional mentorship": "Professional mentorship",
          "Skill development workshops": "Skill development workshops",
          "Project-based learning": "Project-based learning",
          "Diverse industry placements": "Diverse industry placements",
          "Flexible duration options": "Flexible duration options",
          "Career guidance": "Career guidance",
          "Performance evaluation": "Performance evaluation",
          "Community impact projects": "Community impact projects",
          "Flexible schedules": "Flexible schedules",
          "Team collaboration": "Team collaboration",
          "Leadership opportunities": "Leadership opportunities",
          "Industry certifications": "Industry certifications",
          "Soft skills training": "Soft skills training",
          "Networking events": "Networking events",
          "Career workshops": "Career workshops",

          // Auth
          createAccount: "Create an Account",
          joinCommunity: "Join our community as a volunteer or organization",
          volunteer: "Volunteer",
          organization: "Organization",
          alreadyAccount: "Already have an account?",
          email: "Email",
          password: "Password",
          forgotPassword: "Forgot password?",
          orContinueWith: "Or continue with",
          dontHaveAccount: "Don't have an account?",
          signUp: "Sign up",

          // About Page
          "about.hero.title":
            "Connecting Organizations with Passionate Volunteers",
          "about.hero.subtitle":
            "Volunect is Saudi Arabia's premier platform bridging the gap between organizations and motivated volunteers.",
          "about.mission": "Our Mission",
          "about.mission.text1":
            "At Volunect, we're dedicated to fostering meaningful connections between organizations and volunteers. Our platform serves as a bridge, helping organizations find dedicated volunteers while providing valuable opportunities for personal and professional growth.",
          "about.mission.text2":
            "We believe in the power of volunteerism to transform both individuals and communities, creating lasting positive impact across Saudi Arabia.",
          "about.benefits.title": "Why Organizations Choose Volunect",
          "about.benefits.subtitle":
            "Join hundreds of organizations already benefiting from our platform",
          "about.cta.title": "Ready to Make an Impact?",
          "about.cta.subtitle":
            "Join our growing community of organizations making a difference",
          "about.cta.button": "Register Your Organization",

          // Stats
          "stats.activeVolunteers": "Active Volunteers",
          "stats.partnerOrganizations": "Partner Organizations",
          "stats.opportunitiesPosted": "Opportunities Posted",

          // Benefits
          "benefits.talent.title": "Access to Qualified Talent",
          "benefits.talent.desc":
            "Connect with motivated students and graduates from top Saudi institutions.",
          "benefits.recruitment.title": "Streamlined Recruitment",
          "benefits.recruitment.desc":
            "Easy-to-use platform for posting opportunities and managing applications.",
          "benefits.quality.title": "Quality Assurance",
          "benefits.quality.desc":
            "All volunteers are verified and pre-screened for their skills and commitment.",
          "benefits.impact.title": "Community Impact",
          "benefits.impact.desc":
            "Make a difference while developing future talent for your organization.",

          // Services Page
          "services.title": "Our Services",
          "services.subtitle":
            "Comprehensive solutions for students and organizations to connect, learn, and grow together",
          "services.coop.title": "CO-OP Training",
          "services.coop.desc":
            "Gain practical experience through our comprehensive CO-OP training programs",
          "services.internships.title": "Internships",
          "services.internships.desc":
            "Find the perfect internship opportunity to kickstart your career",
          "services.volunteer.title": "Volunteer Programs",
          "services.volunteer.desc":
            "Make a difference in your community through meaningful volunteer work",
          "services.development.title": "Professional Development",
          "services.development.desc":
            "Enhance your skills with our professional development programs",
          "services.cta.title": "Ready to Get Started?",
          "services.cta.subtitle":
            "Join our platform and discover opportunities that match your goals",

          // Contact Page
          "contact.title": "Contact Us",
          "contact.subtitle":
            "Feel free to use the form or drop us an email. We'd love to hear from you.",
          "contact.form.first": "First",
          "contact.form.last": "Last",
          "contact.form.email": "Email",
          "contact.form.phone": "Phone (optional)",
          "contact.form.message": "Message",
          "contact.form.submit": "Submit",

          // Opportunities
          "opportunities.title": "Available Opportunities",
          "opportunities.location": "Location:",
          "opportunities.degree": "Degree Required:",
          "opportunities.deadline": "Deadline:",
          "opportunities.details.description": "Description",
          "opportunities.details.requirements": "Requirements",
          "opportunities.details.benefits": "Benefits",
          "opportunities.details.apply": "Apply Now",

          // Profile
          "profile.about": "About",
          "profile.details": "Personal Details",
          "profile.org.details": "Organization Details",
          "profile.username": "Username",
          "profile.fullName": "Full Name",
          "profile.phone": "Phone",
          "profile.location": "Location",
          "profile.degree": "Degree",
          "profile.gender": "Gender",
          "profile.age": "Age",
          "profile.services": "Services Provided",
          "profile.cv": "CV",
          "profile.contact": "Contact Information",
          "profile.contact.button": "Contact for Opportunities",
          "profile.interest": "Interest",

          // Applications
          "applications.title": "Your Applications",
          "applications.details": "Announcement",
          "applications.org": "Organization",
          "applications.status": "Status",
          "applications.submittedOn": "Date",
          "applications.none": "No applications found.",
          "applications.status.pending": "Pending",
          "applications.status.approved": "Approved",
          "applications.status.rejected": "Rejected",
          "applications.status.unknown": "Unknown",

          //Application Success

          "application.success.title": "Thank You!",
          "application.success.message": "Your application has been submitted successfully.",
          "application.success.check": "You can check your application status in your profile under",
          "application.success.statusLink": "Application Status",
          "application.success.view": "View My Applications",
          "application.success.explore": "Explore More Opportunities",


          // Admin

          "admin.applications.title": "Manage Applications",
          "admin.applications.new": "Add Announcement",
          "admin.applications.view": "View Applications",
          "admin.applications.back": "Back to Announcements",
          "admin.applications.approve": "Approve",
          "admin.applications.reject": "Reject",
          "admin.applications.confirm": "Confirm",
          "admin.applications.confirmed": "Confirmed",
          "applications.title": "Volunteer Applications",
          "applications.none": "No applications found.",
          "applications.status.pending": "Pending",
          "applications.status.approved": "Approved",
          "applications.status.rejected": "Rejected",
          "applications.details.date": "Posted",



          // Dashboard
          "dashboard.title": "Impact Dashboard",
          "dashboard.stats.hours": "Volunteer Hours",
          "dashboard.stats.projects": "Projects Completed",
          "dashboard.stats.achievements": "Achievements",
          "dashboard.stats.impacted": "People Impacted",
          "dashboard.projects.title": "Recent Projects",
          "dashboard.achievements.title": "Achievements",

          //AnnouncementDropDownMenu

          "filter.byProgram": "Filter by Program:",
          "program.all": "All Programs",
          "program.highschool": "High School",
          "program.undergraduate": "Undergraduate",
          "program.coop": "CO-OP",
          "announcements.none": "No announcements found.",
          "announcements.viewAll": "View All Announcements",

          //Announcement Page

          "search": "Search opportunities...",
          "opportunities.title": "Opportunities",
          "opportunities.none": "No opportunities found.",
          "opportunities.paid": "💰 Paid",

          "opportunities.unpaid": "Unpaid",
          "opportunities.salary.notSpecified": "Amount Not Specified",
          "opportunities.hours": "Hours Offered",
          "opportunities.hours.notSpecified": "Not specified",
          "opportunities.details.learnMore": "Learn More",

          "opportunities.filter.byType": "Filter by Type",
          "opportunities.filter.byDegree": "Filter by Program",
          "opportunities.filter.byPaid": "Filter by Payment",
          "opportunities.filter.type.all": "All Opportunities",
          "opportunities.filter.type.internship": "Internships",
          "opportunities.filter.type.volunteer": "Volunteer",
          "opportunities.filter.paid.all": "All",
          "opportunities.filter.paid.paid": "Paid",
          "opportunities.filter.paid.unpaid": "Unpaid",

          "opportunities.type.internship": "Internship",
          "opportunities.type.volunteer": "Volunteer",

          "program.all": "All Programs",
          "program.highschool": "High School",
          "program.undergraduate": "Undergraduate",
          "program.coop": "CO-OP",



          //Opportunity Page


          "opportunities.details.notfound": "Opportunity not found.",
          "opportunities.details.compensation": "Compensation",
          "opportunities.details.paid": "Paid",
          "opportunities.details.unpaid": "Unpaid",
          "opportunities.details.salary.notSpecified": "Salary Not Specified",
          "opportunities.details.hours": "Hours",
          "opportunities.details.hours.notSpecified": "Not specified",
          "opportunities.details.description": "Description",
          "opportunities.details.description.empty": "No description available.",
          "opportunities.details.apply": "Apply Now",
          "opportunities.details.alreadyApplied": "Already Applied",
          "opportunities.details.orgCantApply": "Organizations Can't Apply",
          "opportunities.details.notSpecified": "Not Specified",



          //AnnouncementForm

          "announcementForm.title": "New Announcement",
          "announcementForm.type": "Opportunity Type",
          "announcementForm.type.volunteer": "Volunteer",
          "announcementForm.type.internship": "Internship",
          "announcementForm.name": "Opportunity Title",
          "announcementForm.degree": "Required Degree",
          "announcementForm.degree.highschool": "High School",
          "announcementForm.degree.undergraduate": "Undergraduate",
          "announcementForm.degree.coop": "CO-OP",
          "announcementForm.location": "Location",
          "announcementForm.deadline": "Deadline",
          "announcementForm.picture": "Picture URL",
          "announcementForm.paid": "Is this a paid opportunity?",
          "announcementForm.unpaid": "Unpaid",
          "announcementForm.salary": "Salary (per month)",
          "announcementForm.salary.placeholder": "Enter salary amount",
          "announcementForm.description": "Description",
          "announcementForm.description.placeholder": "Enter a description...",
          "announcementForm.hours.placeholder": "Enter the number of volunteer hours",
          "announcementForm.cancel": "Cancel",
          "announcementForm.submit": "Submit",
          "announcementForm.hours": "Volunteer Hours",
          "announcementForm.cpaid": "Paid",




          // Settings
          "settings.title": "Settings",
          "settings.profile": "Profile Settings",
          "settings.password": "Change Password",
          "settings.notifications": "Notification Settings",
          "settings.notifications.email": "Email Notifications",
          "settings.notifications.desc":
            "Receive updates about new opportunities",
          "settings.org.name": "Organization Name",
          "settings.firstName": "First Name",
          "settings.middleName": "Middle Name",
          "settings.lastName": "Last Name",
          "settings.region": "Region",
          "settings.city": "City",
          "settings.selectRegion": "Select a region",
          "settings.selectCity": "Select a city",
          "settings.selectDegree": "Select your degree",
          "settings.selectGender": "Select your gender",
          "settings.cvLink": "CV Link",
          "settings.about": "About",
          "settings.about.org": "About Organization",
          "settings.about.self": "About Yourself",
          "settings.services": "Services Provided (Interests)",
          "settings.services.desc":
            "Enter services you can provide, separated by commas (e.g., Web Design, Coding, Graphic Design)",
          "Enter your age": "Enter your age",
          "gender.male": "Male",
          "gender.female": "Female",
          "gender.prefernottosay": "Prefer not to say",
          "settings.phone": "Phone Number",
          "settings.degree": "Degree",

          //delete button
          "delete.button": "Delete"
        },
      },
      ar: {
        translation: {
          // Common
          language: "اللغة",
          english: "الإنجليزية",
          arabic: "العربية",
          signIn: "تسجيل الدخول",
          register: "التسجيل",
          home: "الرئيسية",
          aboutUs: "من نحن",
          services: "الخدمات",
          announcements: "الإعلانات",
          contact: "اتصل بنا",
          search: "بحث...",
          welcome: "مرحباً",
          profile: "الملف الشخصي",
          settings: "الإعدادات",
          logOut: "تسجيل الخروج",
          applications: "التطبيقات",
          loading: "جاري التحميل...",
          save: "حفظ التغييرات",
          saving: "جاري الحفظ...",

          // Landing Page
          "hero.title": "أحدث فرقاً",
          "hero.subtitle":
            "انضم إلى مجتمعنا من المتطوعين وساهم في إحداث تغيير إيجابي في المملكة العربية السعودية",
          startJourney: "ابدأ رحلتك",
          "mission.title": "مهمتنا",
          "mission.text":
            "فولونكت مكرسة لتعزيز الروابط الهادفة بين المنظمات والمتطوعين. نؤمن بقوة خدمة المجتمع في تحويل الأفراد والمجتمع.",
          "whyChoose.title": "لماذا تختارنا",
          "whyChoose.text":
            "نقدم مجموعة متنوعة من الفرص المصممة لمختلف المهارات والاهتمامات. منصتنا تجعل من السهل العثور على المواقع التي تناسب شغفك والتقدم لها.",
          "discover.title": "اكتشف الفرص",
          learnMore: "اعرف المزيد",
          "impact.title": "هل أنت مستعد لإحداث تأثير؟",
          "impact.subtitle":
            "انضم إلى مجتمعنا المتنامي وابدأ في إحداث فرق اليوم",
          getStarted: "ابدأ الآن",
          contactUs: "اتصل بنا",

          // Footer
          "footer.rights": "جميع الحقوق محفوظة",
          "footer.privacy": "سياسة الخصوصية",
          "footer.terms": "شروط الخدمة",

          // Legal Pages
          "Last updated": "آخر تحديث",
          "Information We Collect": "المعلومات التي نجمعها",
          "We collect information that you provide directly to us when you":
            "نجمع المعلومات التي تقدمها لنا مباشرة عندما",
          "Create an account": "إنشاء حساب",
          "Fill out your profile": "تعبئة ملفك الشخصي",
          "Apply for opportunities": "التقدم للفرص",
          "Contact us": "اتصل بنا",
          "How We Use Your Information": "كيف نستخدم معلوماتك",
          "We use the information we collect to":
            "نستخدم المعلومات التي نجمعها لـ",
          "Provide and improve our services": "تقديم وتحسين خدماتنا",
          "Match volunteers with opportunities": "مطابقة المتطوعين مع الفرص",
          "Communicate with you about opportunities": "التواصل معك بشأن الفرص",
          "Ensure platform security": "ضمان أمان المنصة",
          "Information Sharing": "مشاركة المعلومات",
          "We do not sell your personal information. We share your information only with":
            "نحن لا نبيع معلوماتك الشخصية. نشارك معلوماتك فقط مع",
          "Organizations you apply to volunteer with":
            "المنظمات التي تتقدم للتطوع معها",
          "Service providers who assist our operations":
            "مقدمي الخدمات الذين يساعدون في عملياتنا",
          "When required by law": "عندما يتطلب القانون ذلك",
          "If you have any questions about this Privacy Policy, please contact us at":
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على",
          "1. Acceptance of Terms": "1. قبول الشروط",
          "By accessing and using Volunect, you agree to be bound by these Terms of Service and all applicable laws and regulations.":
            "من خلال الوصول إلى فولونكت واستخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها.",
          "2. User Responsibilities": "2. مسؤوليات المستخدم",
          "You agree to": "أنت توافق على",
          "Provide accurate and complete information":
            "تقديم معلومات دقيقة وكاملة",
          "Maintain the security of your account": "الحفاظ على أمان حسابك",
          "Not misuse the platform or its services":
            "عدم إساءة استخدام المنصة أو خدماتها",
          "Comply with all local laws and regulations":
            "الامتثال لجميع القوانين واللوائح المحلية",
          "3. Organization Guidelines": "3. إرشادات المنظمة",
          "Organizations using Volunect must":
            "يجب على المنظمات التي تستخدم فولونكت",
          "Provide accurate opportunity descriptions":
            "تقديم أوصاف دقيقة للفرص",
          "Maintain professional conduct with volunteers":
            "الحفاظ على السلوك المهني مع المتطوعين",
          "Comply with all applicable labor laws":
            "الامتثال لجميع قوانين العمل المعمول بها",
          "Respect volunteer privacy and data":
            "احترام خصوصية المتطوعين وبياناتهم",
          "4. Intellectual Property": "4. الملكية الفكرية",
          "All content and materials available on Volunect are protected by intellectual property rights. You may not use, reproduce, or distribute any content without our express permission.":
            "جميع المحتويات والمواد المتاحة على فولونكت محمية بحقوق الملكية الفكرية. لا يجوز لك استخدام أو إعادة إنتاج أو توزيع أي محتوى دون إذن صريح منا.",
          "5. Contact": "5. اتصل بنا",
          "For any questions regarding these Terms of Service, please contact us at":
            "لأي أسئلة بخصوص شروط الخدمة هذه، يرجى الاتصال بنا على",

          // Service Page Features
          "Hands-on industry experience": "خبرة عملية في الصناعة",
          "Professional mentorship": "إرشاد مهني",
          "Skill development workshops": "ورش عمل لتطوير المهارات",
          "Project-based learning": "التعلم القائم على المشاريع",
          "Diverse industry placements": "فرص متنوعة في الصناعة",
          "Flexible duration options": "خيارات مدة مرنة",
          "Career guidance": "التوجيه المهني",
          "Performance evaluation": "تقييم الأداء",
          "Community impact projects": "مشاريع تأثير المجتمع",
          "Flexible schedules": "جداول مرنة",
          "Team collaboration": "تعاون الفريق",
          "Leadership opportunities": "فرص القيادة",
          "Industry certifications": "شهادات الصناعة",
          "Soft skills training": "تدريب المهارات الناعمة",
          "Networking events": "فعاليات التواصل",
          "Career workshops": "ورش عمل مهنية",

          // Auth
          createAccount: "إنشاء حساب",
          joinCommunity: "انضم إلى مجتمعنا كمتطوع أو منظمة",
          volunteer: "متطوع",
          organization: "منظمة",
          alreadyAccount: "هل لديك حساب بالفعل؟",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          forgotPassword: "نسيت كلمة المرور؟",
          orContinueWith: "أو تابع باستخدام",
          dontHaveAccount: "ليس لديك حساب؟",
          signUp: "التسجيل",

          // About Page
          "about.hero.title": "ربط المنظمات بالمتطوعين المتحمسين",
          "about.hero.subtitle":
            "فولونكت هي المنصة الرائدة في المملكة العربية السعودية التي تسد الفجوة بين المنظمات والمتطوعين المتحمسين.",
          "about.mission": "مهمتنا",
          "about.mission.text1":
            "في فولونكت، نحن مكرسون لتعزيز الروابط الهادفة بين المنظمات والمتطوعين. تعمل منصتنا كجسر، مما يساعد المنظمات على إيجاد متطوعين متفانين مع توفير فرص قيمة للنمو الشخصي والمهني.",
          "about.mission.text2":
            "نؤمن بقوة التطوع في تحويل الأفراد والمجتمعات، مما يخلق تأثيرًا إيجابيًا دائمًا في جميع أنحاء المملكة العربية السعودية.",
          "about.benefits.title": "لماذا تختار المنظمات فولونكت",
          "about.benefits.subtitle":
            "انضم إلى مئات المنظمات التي تستفيد بالفعل من منصتنا",
          "about.cta.title": "هل أنت مستعد لإحداث تأثير؟",
          "about.cta.subtitle":
            "انضم إلى مجتمعنا المتنامي من المنظمات التي تحدث فرقًا",
          "about.cta.button": "سجل منظمتك",

          // Stats
          "stats.activeVolunteers": "متطوعين نشطين",
          "stats.partnerOrganizations": "منظمات شريكة",
          "stats.opportunitiesPosted": "فرص منشورة",

          // Benefits
          "benefits.talent.title": "الوصول إلى المواهب المؤهلة",
          "benefits.talent.desc":
            "تواصل مع الطلاب والخريجين المتحمسين من أفضل المؤسسات السعودية.",
          "benefits.recruitment.title": "توظيف مبسط",
          "benefits.recruitment.desc":
            "منصة سهلة الاستخدام لنشر الفرص وإدارة الطلبات.",
          "benefits.quality.title": "ضمان الجودة",
          "benefits.quality.desc":
            "يتم التحقق من جميع المتطوعين وفحصهم مسبقًا لمهاراتهم والتزامهم.",
          "benefits.impact.title": "تأثير المجتمع",
          "benefits.impact.desc":
            "أحدث فرقًا أثناء تطوير المواهب المستقبلية لمنظمتك.",

          // Services Page
          "services.title": "خدماتنا",
          "services.subtitle":
            "حلول شاملة للطلاب والمنظمات للتواصل والتعلم والنمو معًا",
          "services.coop.title": "تدريب تعاوني",
          "services.coop.desc":
            "اكتسب خبرة عملية من خلال برامج التدريب التعاوني الشاملة",
          "services.internships.title": "التدريب الداخلي",
          "services.internships.desc":
            "ابحث عن فرصة التدريب المثالية لبدء حياتك المهنية",
          "services.volunteer.title": "برامج التطوع",
          "services.volunteer.desc":
            "أحدث فرقًا في مجتمعك من خلال العمل التطوعي الهادف",
          "services.development.title": "التطوير المهني",
          "services.development.desc":
            "عزز مهاراتك من خلال برامج التطوير المهني لدينا",
          "services.cta.title": "هل أنت مستعد للبدء؟",
          "services.cta.subtitle":
            "انضم إلى منصتنا واكتشف الفرص التي تناسب أهدافك",

          // Contact Page
          "contact.title": "اتصل بنا",
          "contact.subtitle":
            "لا تتردد في استخدام النموذج أو مراسلتنا عبر البريد الإلكتروني. نحن نحب أن نسمع منك.",
          "contact.form.first": "الاسم الأول",
          "contact.form.last": "الاسم الأخير",
          "contact.form.email": "البريد الإلكتروني",
          "contact.form.phone": "الهاتف (اختياري)",
          "contact.form.message": "الرسالة",
          "contact.form.submit": "إرسال",

          // Opportunities
          "opportunities.title": "الفرص المتاحة",
          "opportunities.location": "الموقع:",
          "opportunities.degree": "الدرجة المطلوبة:",
          "opportunities.deadline": "الموعد النهائي:",
          "opportunities.details.description": "الوصف",
          "opportunities.details.requirements": "المتطلبات",
          "opportunities.details.benefits": "المزايا",
          "opportunities.details.apply": "تقدم الآن",

          // Profile
          "profile.about": "نبذة",
          "profile.details": "التفاصيل الشخصية",
          "profile.org.details": "تفاصيل المنظمة",
          "profile.username": "اسم المستخدم",
          "profile.fullName": "الاسم الكامل",
          "profile.phone": "الهاتف",
          "profile.location": "الموقع",
          "profile.degree": "الدرجة العلمية",
          "profile.gender": "الجنس",
          "profile.age": "العمر",
          "profile.services": "الخدمات المقدمة",
          "profile.cv": "السيرة الذاتية",
          "profile.contact": "معلومات الاتصال",
          "profile.interest": "الاهتمامات",
          "profile.contact.button": "تواصل للفرص",

          // Applications
          "applications.title": "طلباتك",
          "applications.details": "الإعلان",
          "applications.org": "المنظمة",
          "applications.status": "الحالة",
          "applications.submittedOn": "التاريخ",
          "applications.none": "لم يتم العثور على طلبات.",
          "applications.status.pending": "قيد المراجعة",
          "applications.status.approved": "مقبول",
          "applications.status.rejected": "مرفوض",
          "applications.status.unknown": "غير معروف",

          //Application Success

          "application.success.title": "🎉 شكرًا لك!",
          "application.success.message": "تم تقديم طلبك بنجاح.",
          "application.success.check": "يمكنك متابعة حالة الطلب في ملفك الشخصي ضمن",
          "application.success.statusLink": "حالة الطلبات",
          "application.success.view": "عرض طلباتي",
          "application.success.explore": "استكشاف المزيد من الفرص",




          // Admin


          "admin.applications.title": "إدارة الطلبات",
          "admin.applications.new": "إضافة إعلان",
          "admin.applications.view": "عرض الطلبات",
          "admin.applications.back": "العودة للإعلانات",
          "admin.applications.approve": "موافقة",
          "admin.applications.reject": "رفض",
          "admin.applications.confirm": "تأكيد",
          "admin.applications.confirmed": "تم التأكيد",
          "applications.title": "طلبات المتطوعين",
          "applications.none": "لا توجد طلبات.",
          "applications.status.pending": "قيد المراجعة",
          "applications.status.approved": "تمت الموافقة",
          "applications.status.rejected": "مرفوض",
          "applications.details.date": "تاريخ النشر",





          // Dashboard
          "dashboard.title": "لوحة تأثير",
          "dashboard.stats.hours": "ساعات التطوع",
          "dashboard.stats.projects": "المشاريع المكتملة",
          "dashboard.stats.achievements": "الإنجازات",
          "dashboard.stats.impacted": "الأشخاص المتأثرين",
          "dashboard.projects.title": "المشاريع الأخيرة",
          "dashboard.achievements.title": "الإنجازات",

          //AnnouncementDropDownMenu

          "filter.byProgram": "تصفية حسب البرنامج:",
          "program.all": "جميع البرامج",
          "program.highschool": "الثانوية العامة",
          "program.undergraduate": "البكالوريوس",
          "program.coop": "التدريب التعاوني",
          "announcements.none": "لم يتم العثور على إعلانات.",
          "announcements.viewAll": "عرض جميع الإعلانات",


          //Announcement Page
          "search": "ابحث عن الفرص...",
          "opportunities.title": "الفرص",
          "opportunities.none": "لم يتم العثور على فرص.",
          "opportunities.paid": "💰 مدفوعة",
          "opportunities.unpaid": "غير مدفوعة",
          "opportunities.salary.notSpecified": "المبلغ غير محدد",
          "opportunities.hours": "عدد الساعات",
          "opportunities.hours.notSpecified": "غير محدد",
          "opportunities.details.learnMore": "عرض المزيد",
          "opportunities.details.notSpecified": "غير محدد",

          "opportunities.filter.byType": "تصفية حسب النوع",
          "opportunities.filter.byDegree": "تصفية حسب البرنامج",
          "opportunities.filter.byPaid": "تصفية حسب الدفع",
          "opportunities.filter.type.all": "جميع الفرص",
          "opportunities.filter.type.internship": "التدريب",
          "opportunities.filter.type.volunteer": "التطوع",
          "opportunities.filter.paid.all": "الكل",
          "opportunities.filter.paid.paid": "مدفوعة",
          "opportunities.filter.paid.unpaid": "غير مدفوعة",

          "opportunities.type.internship": "تدريب",
          "opportunities.type.volunteer": "تطوع",

          "program.all": "جميع البرامج",
          "program.highschool": "الثانوية العامة",
          "program.undergraduate": "البكالوريوس",
          "program.coop": "التدريب التعاوني",


          //AnnouncementForm

          "announcementForm.title": "إعلان جديد",
          "announcementForm.type": "نوع الفرصة",
          "announcementForm.type.volunteer": "تطوع",
          "announcementForm.type.internship": "تدريب",
          "announcementForm.name": "عنوان الفرصة",
          "announcementForm.degree": "المؤهل المطلوب",
          "announcementForm.degree.highschool": "الثانوية العامة",
          "announcementForm.degree.undergraduate": "البكالوريوس",
          "announcementForm.degree.coop": "التدريب التعاوني",
          "announcementForm.location": "الموقع",
          "announcementForm.deadline": "الموعد النهائي",
          "announcementForm.picture": "رابط الصورة",
          "announcementForm.paid": "مدفوعة",
          "announcementForm.unpaid": "غير مدفوعة",
          "announcementForm.salary": "الراتب (شهريًا)",
          "announcementForm.salary.placeholder": "أدخل مبلغ الراتب",
          "announcementForm.description": "الوصف",
          "announcementForm.description.placeholder": "أدخل وصفًا...",
          "announcementForm.cancel": "إلغاء",
          "announcementForm.submit": "إرسال",
          "announcementForm.hours": "عدد ساعات التطوع",
          "announcementForm.hours.placeholder": "أدخل عدد ساعات التطوع",
          "announcementForm.cpaid": "مدفوع",




          //Opportunity Page
          "opportunities.details.notfound": "لم يتم العثور على الفرصة.",
          "opportunities.details.compensation": "التعويض",
          "opportunities.details.paid": "مدفوعة",
          "opportunities.details.unpaid": "غير مدفوعة",
          "opportunities.details.salary.notSpecified": "الراتب غير محدد",
          "opportunities.details.hours": "عدد الساعات",
          "opportunities.details.hours.notSpecified": "غير محدد",
          "opportunities.details.description": "الوصف",
          "opportunities.details.description.empty": "لا يوجد وصف متاح.",
          "opportunities.details.apply": "تقدَّم الآن",
          "opportunities.details.alreadyApplied": "تم التقديم مسبقًا",
          "opportunities.details.orgCantApply": "المنظمات لا يمكنها التقديم",






          // Settings
          "settings.title": "الإعدادات",
          "settings.profile": "إعدادات الملف الشخصي",
          "settings.password": "تغيير كلمة المرور",
          "settings.notifications": "إعدادات الإشعارات",
          "settings.notifications.email": "إشعارات البريد الإلكتروني",
          "settings.notifications.desc": "تلقي تحديثات حول الفرص الجديدة",
          "settings.org.name": "اسم المنظمة",
          "settings.firstName": "الاسم الأول",
          "settings.middleName": "الاسم الأوسط",
          "settings.lastName": "الاسم الأخير",
          "settings.region": "المنطقة",
          "settings.city": "المدينة",
          "settings.selectRegion": "اختر منطقة",
          "settings.selectCity": "اختر مدينة",
          "settings.selectDegree": "اختر درجتك العلمية",
          "settings.selectGender": "اختر جنسك",
          "settings.cvLink": "رابط السيرة الذاتية",
          "settings.about": "نبذة",
          "settings.about.org": "نبذة عن المنظمة",
          "settings.about.self": "نبذة عنك",
          "settings.services": "الخدمات المقدمة (الاهتمامات)",
          "settings.services.desc":
            "أدخل الخدمات التي يمكنك تقديمها، مفصولة بفواصل (مثل تصميم الويب، البرمجة، التصميم الجرافيكي)",
          "Enter your age": "أدخل عمرك",
          "gender.male": "ذكر",
          "gender.female": "أنثى",
          "gender.prefernottosay": "أفضل عدم الذكر",
          "settings.phone": "رقم الهاتف",
          "settings.degree": "الدرجة العلمية",


          //delete button
          "delete.button": "حذف"


        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
