import { connectToDatabase } from './db';

const BLOGS = [
  {
    slug: "how-to-build-pitch-deck-vc-capital",
    title: "How to Build a Pitch Deck that Attracts VC Capital",
    category: "Startup Funding",
    description: "Learn the exact slides, formatting rules, and execution metrics global venture capital firms look for before writing a check.",
    author: "Saurabh Jain",
    date: "June 25, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>The Investor Mindset: It's All About Risk Reduction</h2>
      <p>When presenting your startup to venture capitalists, your primary goal is to show how you reduce market, team, and execution risk. Most pitch decks fail because they focus entirely on the product features instead of the financial opportunity.</p>
      
      <h3>The Essential 10 Slides for Every Startup</h3>
      <p>A standard investor pitch deck should follow the simple 10-slide rule popularized by top accelerators:</p>
      <ol>
        <li><strong>Title Slide:</strong> Clear value proposition in one sentence.</li>
        <li><strong>Problem:</strong> The actual pain point you are solving.</li>
        <li><strong>Solution:</strong> Your product and how it solves the pain point.</li>
        <li><strong>Market Size:</strong> TAM, SAM, and SOM calculations.</li>
        <li><strong>Business Model:</strong> How you make money.</li>
        <li><strong>Execution Strategy (Traction):</strong> Active user graphs and unit economics.</li>
        <li><strong>Competition:</strong> Your competitive landscape matrix.</li>
        <li><strong>Marketing & Sales Plan:</strong> How you acquire customers at scale.</li>
        <li><strong>Team:</strong> Proof of execution capability.</li>
        <li><strong>Financial Projections:</strong> 3-year roadmap and the capital ask.</li>
      </ol>

      <h3>Defining Your Traction Metrics Precisely</h3>
      <p>Investors do not want vanity metrics. Avoid listing total signups. Instead, list monthly active users (MAU), customer lifetime value (LTV), customer acquisition cost (CAC), and cohort retention. If you use on-ground activation force (like our Vegavruddhi systems), show transaction velocity per agent.</p>
      
      <blockquote>"A pitch deck isn't about selling your product; it is about selling the financial return on your execution capability."</blockquote>

      <h3>How to Frame the Ask</h3>
      <p>Clearly explain how the funding will be deployed. Break down the capital allocation: e.g., 40% Product & Engineering, 40% Customer Acquisition, 20% Operations. Provide a timeline of when you expect to achieve your next milestone, making it clear that this round secures 18 months of runway.</p>
    `,
    related: ["scaling-sales-teams-direct-lead-fulfillment", "d2c-brands-circular-retail-rewards"]
  },
  {
    slug: "scaling-sales-teams-direct-lead-fulfillment",
    title: "Scaling Sales Teams & Direct-to-Consumer Lead Fulfillment",
    category: "Business Growth",
    description: "An operational roadmap to scaling direct field-force operations, managing merchant onboarding, and bridging digital leads with active buyers.",
    author: "Dheeraj Anand",
    date: "June 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>The Digital Fallacy: Online Onboarding Is Not Enough</h2>
      <p>Many digital conglomerates make the mistake of assuming that a well-designed mobile application is sufficient for merchant onboarding. However, emerging market logistics and FinTech applications require a physical, direct-to-consumer presence to build initial trust and drive active transactions.</p>
      
      <h3>1. Recruiting and Training a Specialized Field Force</h3>
      <p>Building a high-velocity managed sales team requires structural execution. Agents must be trained not just in sales pitches, but in handling regulatory verification, merchant profiles, and technical onboarding procedures.</p>

      <h3>2. Algorithmic Lead Routing</h3>
      <p>By pairing field agents with local geographic grids, you can dramatically lower acquisition costs. Direct leads captured via online campaigns must be dynamically routed to nearest field agents in real-time, boosting conversion rates by up to 35%.</p>

      <blockquote>"On-ground execution bridges the gap between digital scalability and local market reality."</blockquote>

      <h3>3. Real-time Compliance Verification</h3>
      <p>To reduce onboarding fraud and layout shifts in database transactions, field applications must have embedded OCR scanners and identity validators. Vegavruddhi's deployment models show that double-layer validation decreases verification times from 4 days to under 20 minutes.</p>
    `,
    related: ["how-to-build-pitch-deck-vc-capital", "d2c-brands-circular-retail-rewards"]
  },
  {
    slug: "d2c-brands-circular-retail-rewards",
    title: "Why D2C Brands Must Embrace Circular Retail Reward Models",
    category: "Market Insights",
    description: "How sustainable circular fashion frameworks, inventory buyback programs, and loyalty coins increase retention and lower customer acquisition costs.",
    author: "Devam Srivastava",
    date: "June 10, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?q=80&w=800&auto=format&fit=crop",
    content: `
      <h2>The Crisis of Modern D2C Customer Acquisition Cost (CAC)</h2>
      <p>Over the last three years, digital advertising costs have increased by over 120%. Brands relying purely on paid marketing campaigns are seeing margins compress to near zero. The solution? Build a closed-loop customer lifecycle system that incentivizes return purchases through sustainability.</p>

      <h3>Understanding Circular Retail</h3>
      <p>Circular retail is an architectural commerce structure where customers can return used or unwanted inventory in exchange for store loyalty credits. These returned garments are then recycled, upcycled, or resold, creating a zero-landfill ecosystem.</p>

      <h3>The BWorth Rewards Model: Monetizing Recycled Inventory</h3>
      <p>By assigning direct, stable monetary value to recycled items (e.g., BWorth Coins at a 1:1 Rupee ratio), you provide customers with immediate purchasing power for their next order. This model achieves two outcomes:</p>
      <ul>
        <li><strong>Increased Customer Lifetime Value (LTV):</strong> Customers return to spend their earned credits.</li>
        <li><strong>Organic Word-of-Mouth:</strong> High-impact ESG marketing vectors drive organic acquisition, dropping CAC by 40%.</li>
      </ul>

      <blockquote>"Sustainability is no longer a corporate social responsibility; it is the ultimate loyalty optimization strategy."</blockquote>

      <h3>Implementing Carbon Tracking</h3>
      <p>Modern consumers demand transparency. Providing a personalized carbon savings dashboard inside your application increases customer engagement and builds trust. Show users exactly how much water and CO2 they saved by choosing to recycle rather than discard.</p>
    `,
    related: ["how-to-build-pitch-deck-vc-capital", "scaling-sales-teams-direct-lead-fulfillment"]
  }
];

export async function getAllBlogs() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('blogs');

    const dbBlogs = await collection.find({}).toArray();
    const cleanBlogs = dbBlogs.map(({ _id, ...blog }) => blog);

    // Sort blogs by date descending
    cleanBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    return cleanBlogs;
  } catch (error) {
    console.error('MongoDB database query for blogs failed:', error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('blogs');
    const blog = await collection.findOne({ slug });
    if (blog) {
      const { _id, ...cleanBlog } = blog;
      return cleanBlog;
    }
    return null;
  } catch (error) {
    console.error(`MongoDB query for blog slug "${slug}" failed:`, error);
    return null;
  }
}

export async function getRelatedBlogs(slug) {
  try {
    const current = await getBlogBySlug(slug);
    if (!current || !current.related || current.related.length === 0) return [];

    const { db } = await connectToDatabase();
    const collection = db.collection('blogs');
    const dbBlogs = await collection.find({ slug: { $in: current.related } }).toArray();
    return dbBlogs.map(({ _id, ...blog }) => blog);
  } catch (error) {
    console.error(`MongoDB query for related blogs for "${slug}" failed:`, error);
    return [];
  }
}

export async function getBlogsByCategory(category) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('blogs');
    const dbBlogs = await collection.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } }).toArray();
    return dbBlogs.map(({ _id, ...blog }) => blog);
  } catch (error) {
    console.error(`MongoDB query for blogs in category "${category}" failed:`, error);
    return [];
  }
}
