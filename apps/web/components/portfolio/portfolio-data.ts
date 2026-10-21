export const portfolioCategories = [
  "All",
  "Fashion & Retail",
  "Food & Beverage",
  "Hospitality",
  "Education",
  "Automotive",
  "Healthcare"
] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];
export type ProjectCategory = Exclude<PortfolioCategory, "All">;

export type PortfolioProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  objective: string;
  image: string;
  imageAlt: string;
  websiteUrl: string;
  services: readonly string[];
  approach: readonly string[];
  status: "Live Website";
};

/** Team-supplied projects and optimized screenshots. Descriptions refer to visible
 * website features, not independently verified conversion or traffic results. */
export const portfolioProjects = [
  {
    "id": "style-club",
    "title": "Style Club",
    "category": "Fashion & Retail",
    "summary": "A fashion storefront with editorial product storytelling and streamlined shopping journeys.",
    "objective": "Showcase new arrivals and collections for women, men and kids in a striking retail experience.",
    "image": "/portfolio/style-club.webp",
    "imageAlt": "Style Club homepage featuring a model in denim and fashion category navigation",
    "websiteUrl": "https://www.styleclub.fashion/",
    "services": [
      "Fashion e-commerce",
      "Responsive storefront",
      "Product discovery"
    ],
    "approach": [
      "Lead with full-screen campaign imagery and impactful fashion typography.",
      "Organize browsing around arrivals, collections and shopping categories.",
      "Make search, favourites and shopping easy to find."
    ],
    "status": "Live Website"
  },
  {
    "id": "big-mos",
    "title": "Big Mo's Cafe",
    "category": "Food & Beverage",
    "summary": "A lively café website for discovering vegetarian food, menus and ordering options.",
    "objective": "Help visitors explore the Prayagraj café and its menu while keeping ordering accessible.",
    "image": "/portfolio/big-mos.webp",
    "imageAlt": "Big Mo's Cafe restaurant homepage with a hero photograph and online-order button",
    "websiteUrl": "https://big-mos.vercel.app/",
    "services": [
      "Restaurant website",
      "Menu experience",
      "Ordering journey"
    ],
    "approach": [
      "Lead with real café imagery and an inviting message.",
      "Present menu, gallery, outlets and contact in clear navigation.",
      "Give ordering a prominent next step."
    ],
    "status": "Live Website"
  },
  {
    "id": "bar-code",
    "title": "Bar Code",
    "category": "Food & Beverage",
    "summary": "A dark, gold-accented bar and restaurant website with an atmospheric nightlife identity.",
    "objective": "Introduce the venue, dining experience and table-reservation path.",
    "image": "/portfolio/bar-code.webp",
    "imageAlt": "Bar Code restaurant homepage featuring a gold-accented black theme and reservation button",
    "websiteUrl": "https://www.thebarcode.in/",
    "services": [
      "Hospitality website",
      "Brand presentation",
      "Reservation entry point"
    ],
    "approach": [
      "Use warm imagery and elegant type to establish a venue identity.",
      "Organize drinks, food, gallery and visit information.",
      "Keep table reservation easy to discover."
    ],
    "status": "Live Website"
  },
  {
    "id": "casa-de-grande",
    "title": "Casa De Grande",
    "category": "Hospitality",
    "summary": "An elegant boutique hotel website led by property photography and hospitality storytelling.",
    "objective": "Introduce the hotel's surroundings and give guests an easy path to explore or book.",
    "image": "/portfolio/casa-de-grande.webp",
    "imageAlt": "Casa De Grande boutique hotel website with illuminated exterior and booking action",
    "websiteUrl": "https://www.thecasahotel.in/",
    "services": [
      "Hotel website",
      "Visual storytelling",
      "Booking entry point"
    ],
    "approach": [
      "Use architecture and property imagery as the hero.",
      "Build a calm editorial hierarchy with refined typography.",
      "Keep booking and hotel discovery visible."
    ],
    "status": "Live Website"
  },
  {
    "id": "ignited-brains",
    "title": "Ignited Brains",
    "category": "Education",
    "summary": "An education website showcasing hands-on science, STEM, AI and robotics learning.",
    "objective": "Explain future-ready learning spaces and guide schools towards solutions and partnerships.",
    "image": "/portfolio/ignited-brains.webp",
    "imageAlt": "Ignited Brains website featuring a space-inspired learning innovation visual",
    "websiteUrl": "https://www.ignitedbrain.in/",
    "services": [
      "Education website",
      "Solutions presentation",
      "Content navigation"
    ],
    "approach": [
      "Combine an inspiring visual with a clear education mission.",
      "Surface STEM, space and robotics learning solutions.",
      "Guide educators and partners towards relevant information."
    ],
    "status": "Live Website"
  },
  {
    "id": "rovauto",
    "title": "Rovauto",
    "category": "Automotive",
    "summary": "An automotive platform presenting vehicle service and garage booking in Prayagraj.",
    "objective": "Make available service routes and information for vehicle owners and garage partners easy to discover.",
    "image": "/portfolio/rovauto.webp",
    "imageAlt": "Rovauto website with a car workshop hero and garage booking headline",
    "websiteUrl": "https://www.rovauto.com/",
    "services": [
      "Automotive platform",
      "Service booking interface",
      "Responsive website"
    ],
    "approach": [
      "Put the vehicle-service proposition above the fold.",
      "Offer distinct actions for drivers and garage partners.",
      "Organize booking and services around clarity and speed."
    ],
    "status": "Live Website"
  },
  {
    "id": "lotus-family-dental",
    "title": "Lotus Family Dental",
    "category": "Healthcare",
    "summary": "A dental-clinic website centred on specialist profiles, treatments and appointments.",
    "objective": "Help visitors meet the clinic team and understand how to request dental care.",
    "image": "/portfolio/lotus-family-dental.webp",
    "imageAlt": "Lotus Family Dental website with doctors' profiles and clinic introduction",
    "websiteUrl": "https://lotusfamilydental.me/",
    "services": [
      "Healthcare website",
      "Specialist profiles",
      "Appointment entry point"
    ],
    "approach": [
      "Highlight the clinic team with prominent profile photography.",
      "Structure treatments and practice information for easy browsing.",
      "Give visitors clear appointment and contact actions."
    ],
    "status": "Live Website"
  }
] as const satisfies readonly PortfolioProject[];
