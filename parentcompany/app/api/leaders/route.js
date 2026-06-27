import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { connectToDatabase } from '../../../lib/db';

const defaultLeaders = [
    {
        id: "leader_01",
        tier: "Executive Tier 001",
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        philosophy: "Building on-ground execution intelligence via precision managed sales infrastructure.",
        vision: "Architecting high-performance field-force efficiency through algorithmic sales fulfillment for national growth engines.",
        focus: "Strategic Retail Expansion & End-to-End Lead conversion fulfillment across India's Tier 1 and 2 cities.",
        logo: "/VEGA.png",
        image: "/saurab jain sir .jpeg"
    },
    {
        id: "leader_02",
        tier: "Executive Tier 002",
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        philosophy: "Redefining the value of waste through industrial-scale circular luxury fashion architecture.",
        vision: "Re-imagining luxury fashion as a circular asset, creating a global movement towards zero-landfill conscious consumerism.",
        focus: "Circular Luxury Fashion, Ethical Upcycling Ecosystems & Sustainable Global Value Chain Integration.",
        logo: "/BWORTH.jpg",
        image: "/dheeraj sir.jpeg"
    },
    {
        id: "leader_03",
        tier: "Executive Tier 003",
        name: "Yograj Rundhanker",
        role: "Founder & CEO · RYM Grenergy",
        philosophy: "Harnessing deep-tech intelligence to solve the world's most critical energy challenges.",
        vision: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure.",
        focus: "Clean Energy, AI/ML-driven IoT Innovations & Smart Energy Automation Systems.",
        logo: "",
        image: "/Yograj.jpeg"
    },
    {
        id: "leader_04",
        tier: "Executive Tier 004",
        name: "Devam Srivastava",
        role: "Founder & CEO · Synchronous",
        philosophy: "Scaling institutional legacies through the convergence of high-conversion engineering and supreme aesthetics.",
        vision: "Architecting high-velocity digital ecosystems for high-growth elite brands via algorithmic process automation.",
        focus: "Brand Identity Architecture, Autonomous AI Agents & Predictive Growth Modeling.",
        logo: "",
        image: "/devam .jpeg"
    },
    {
        id: "leader_05",
        tier: "Executive Tier 005",
        name: "Aryan",
        role: "Strategic Partner · Global Growth",
        philosophy: "Expanding industrial footprints through collaborative strategic alliance and market intelligence.",
        vision: "Integrating emerging market opportunities with core institutional values for sustained expansion.",
        focus: "Strategic Alliances, Market Expansion & Operational Scalability.",
        logo: "",
        image: "/aryan.png"
    }
];

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('leaders');

        const count = await collection.countDocuments();
        if (count === 0) {
            console.log('MongoDB leaders collection empty. Seeding defaults...');
            await collection.insertMany(defaultLeaders);
        }

        const dbLeaders = await collection.find({}).toArray();
        const cleanLeaders = dbLeaders.map(({ _id, ...leader }) => leader);

        // Sort by ID order: leader_01, leader_02, etc.
        cleanLeaders.sort((a, b) => a.id.localeCompare(b.id));

        return NextResponse.json({ leaders: cleanLeaders });
    } catch (error) {
        console.error('MongoDB database query for leaders failed. Falling back to static data:', error);
        return NextResponse.json({ leaders: defaultLeaders });
    }
}
