import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper function to generate random short URLs
function generateShortUrl(): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate random date within last 30 days
function getRandomRecentDate(): Date {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return new Date(
    thirtyDaysAgo.getTime() +
    Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
  );
}

// Helper function to generate random IP address
function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🧹 Cleaning up existing data...");
  await prisma.analytics.deleteMany();
  await prisma.click.deleteMany();
  await prisma.url.deleteMany();
  await prisma.user.deleteMany();
  await prisma.plan.deleteMany();

  // Create Plans
  console.log("💎 Creating plans...");
  await prisma.plan.createMany({
    data: [
      {
        type: "BASIC",
        name: "Basic Plan",
        description: "Essential features for individuals",
        price: 0,
        limits: { urls: 10, clicks: 1000 },
        features: ["50 Short Links", "Basic Analytics", "Standard Support"],
      },
      {
        type: "PRO",
        name: "Pro Plan",
        description: "Advanced features for power users",
        price: 499,
        limits: { urls: 500, clicks: 10000 },
        features: ["500 Short Links", "Advanced Analytics", "Priority Support", "Custom Domains"],
      },
      {
        type: "CUSTOM",
        name: "Enterprise Plan",
        description: "Custom solutions for large organizations",
        price: 4999,
        limits: { urls: -1, clicks: -1 }, // -1 for unlimited
        features: ["Unlimited Links", "Real-time Analytics", "Dedicated Support", "SSO", "SLA"],
      },
    ],
  });

  // Create sample users with different roles
  console.log("👥 Creating users...");
  const hashedPassword = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    // Super Admin
    prisma.user.create({
      data: {
        email: "superadmin@urlshortener.com",
        password: hashedPassword,
        name: "Super Administrator",
        role: Role.SUPER_ADMIN,
        username: "superadmin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),

    // Admin
    prisma.user.create({
      data: {
        email: "admin@urlshortener.com",
        password: hashedPassword,
        name: "Admin User",
        role: Role.ADMIN,
        username: "admin",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),

    // Regular Users
    prisma.user.create({
      data: {
        email: "john@example.com",
        password: hashedPassword,
        name: "John Doe",
        role: Role.USER,
        username: "johndoe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    }),

    prisma.user.create({
      data: {
        email: "alice@example.com",
        password: hashedPassword,
        name: "Alice Smith",
        role: Role.USER,
        username: "alicesmith",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b68fafb1?w=150&h=150&fit=crop&crop=face",
      },
    }),

    prisma.user.create({
      data: {
        email: "bob@example.com",
        password: hashedPassword,
        name: "Bob Wilson",
        role: Role.USER,
        username: "bobwilson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    }),

    prisma.user.create({
      data: {
        email: "sarah@example.com",
        password: hashedPassword,
        name: "Sarah Johnson",
        role: Role.USER,
        username: "sarahjohnson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Sample URLs data
  const urlsData = [
    {
      original_url: "https://github.com/vercel/next.js",
      title: "Next.js by Vercel - The React Framework",
      description:
        "Production-ready React framework with hybrid static & server rendering, TypeScript support, smart bundling.",
      favicon: "https://github.com/favicon.ico",
    },
    {
      original_url: "https://www.prisma.io/docs",
      title: "Prisma Documentation",
      description:
        "Prisma is a next-generation ORM that consists of Prisma Client, Prisma Migrate, and Prisma Studio.",
      favicon: "https://www.prisma.io/favicon.ico",
    },
    {
      original_url: "https://tailwindcss.com/",
      title: "Tailwind CSS - Rapidly build modern websites",
      description:
        "A utility-first CSS framework packed with classes for building any design directly in your markup.",
      favicon: "https://tailwindcss.com/favicon.ico",
    },
    {
      original_url: "https://www.typescriptlang.org/",
      title: "TypeScript: JavaScript With Syntax For Types",
      description:
        "TypeScript extends JavaScript by adding types to the language.",
      favicon: "https://www.typescriptlang.org/favicon.ico",
    },
    {
      original_url: "https://reactjs.org/",
      title: "React – A JavaScript library for building user interfaces",
      description:
        "A JavaScript library for building user interfaces with declarative, component-based architecture.",
      favicon: "https://reactjs.org/favicon.ico",
    },
    {
      original_url: "https://nodejs.org/",
      title: "Node.js - JavaScript Runtime",
      description:
        "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      favicon: "https://nodejs.org/favicon.ico",
    },
    {
      original_url: "https://mongodb.com/",
      title: "MongoDB - The Developer Data Platform",
      description:
        "MongoDB is a document database with the scalability and flexibility that you want.",
      favicon: "https://mongodb.com/favicon.ico",
    },
    {
      original_url: "https://vercel.com/",
      title: "Vercel - Build and deploy the web",
      description:
        "Vercel is the platform for frontend developers, providing the speed and reliability innovators need.",
      favicon: "https://vercel.com/favicon.ico",
    },
    {
      original_url: "https://stripe.com/",
      title: "Stripe - Online payment processing",
      description:
        "Online payment processing for internet businesses. Accept payments online with Stripe.",
      favicon: "https://stripe.com/favicon.ico",
    },
    {
      original_url: "https://openai.com/",
      title: "OpenAI - Artificial Intelligence Research",
      description:
        "OpenAI is an AI research and deployment company building safe and beneficial AGI.",
      favicon: "https://openai.com/favicon.ico",
    },
  ];

  // Create URLs - mix of user-owned and anonymous
  console.log("🔗 Creating URLs...");
  const urls = [];
  const regularUsers = users.filter((user) => user.role === Role.USER);

  for (let i = 0; i < urlsData.length; i++) {
    const urlData = urlsData[i];
    const isAnonymous = Math.random() > 0.7; // 30% chance of being anonymous
    const hasExpiration = Math.random() > 0.85; // 15% chance of expiration

    let shortUrl: string;
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure unique short_url
    do {
      shortUrl = generateShortUrl();
      const existing = await prisma.url.findUnique({
        where: { short_url: shortUrl },
      });
      if (!existing) break;
      attempts++;
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      shortUrl = `${generateShortUrl()}_${Date.now()}`;
    }

    const url = await prisma.url.create({
      data: {
        ...urlData,
        short_url: shortUrl,
        user_id: isAnonymous ? null : getRandomElement(regularUsers).id,
        expires_at: hasExpiration
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : null,
      },
    });
    urls.push(url);
  }

  console.log(`✅ Created ${urls.length} URLs`);

  // Create sample clicks with realistic data
  console.log("👆 Creating clicks...");

  const countries = [
    "US",
    "UK",
    "CA",
    "DE",
    "FR",
    "JP",
    "AU",
    "IN",
    "BR",
    "ES",
    "NL",
    "IT",
    "SE",
    "NO",
    "DK",
  ];
  const cities = [
    "New York",
    "London",
    "Toronto",
    "Berlin",
    "Paris",
    "Tokyo",
    "Sydney",
    "Mumbai",
    "São Paulo",
    "Madrid",
    "Amsterdam",
    "Rome",
    "Stockholm",
    "Oslo",
    "Copenhagen",
  ];
  const devices = ["desktop", "mobile", "tablet"];
  const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera"];
  const oses = ["Windows", "macOS", "Linux", "iOS", "Android"];
  const referers = [
    "google.com",
    "twitter.com",
    "facebook.com",
    "linkedin.com",
    "reddit.com",
    "github.com",
    "stackoverflow.com",
    "medium.com",
    "dev.to",
    "direct",
  ];

  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  ];

  let totalClicks = 0;
  for (const url of urls) {
    const clickCount = Math.floor(Math.random() * 150) + 20; // 20-169 clicks per URL

    for (let i = 0; i < clickCount; i++) {
      const referer = getRandomElement(referers);
      await prisma.click.create({
        data: {
          url_id: url.id,
          created_at: getRandomRecentDate(),
          ip_address: generateRandomIP(),
          user_agent: getRandomElement(userAgents),
          referer: referer === "direct" ? null : `https://${referer}`,
          country: getRandomElement(countries),
          city: getRandomElement(cities),
          device: getRandomElement(devices),
          browser: getRandomElement(browsers),
          os: getRandomElement(oses),
        },
      });
    }
    totalClicks += clickCount;
  }

  console.log(`✅ Created ${totalClicks} clicks`);

  // Create aggregated analytics data
  console.log("📊 Creating analytics data...");

  for (const url of urls) {
    // Get clicks for this URL
    const urlClicks = await prisma.click.findMany({
      where: { url_id: url.id },
    });

    // Group clicks by date
    const clicksByDate = new Map<string, typeof urlClicks>();

    urlClicks.forEach((click) => {
      const dateKey = click.created_at.toISOString().split("T")[0];
      if (!clicksByDate.has(dateKey)) {
        clicksByDate.set(dateKey, []);
      }
      clicksByDate.get(dateKey)!.push(click);
    });

    // Create analytics entries for each date
    for (const [dateStr, clicks] of clicksByDate) {
      const countryCounts: Record<string, number> = {};
      const deviceCounts: Record<string, number> = {};
      const browserCounts: Record<string, number> = {};
      const refererCounts: Record<string, number> = {};

      clicks.forEach((click) => {
        if (click.country) {
          countryCounts[click.country] =
            (countryCounts[click.country] || 0) + 1;
        }
        if (click.device) {
          deviceCounts[click.device] = (deviceCounts[click.device] || 0) + 1;
        }
        if (click.browser) {
          browserCounts[click.browser] =
            (browserCounts[click.browser] || 0) + 1;
        }
        if (click.referer) {
          try {
            const domain = new URL(click.referer).hostname;
            refererCounts[domain] = (refererCounts[domain] || 0) + 1;
          } catch {
            refererCounts["direct"] = (refererCounts["direct"] || 0) + 1;
          }
        } else {
          refererCounts["direct"] = (refererCounts["direct"] || 0) + 1;
        }
      });

      await prisma.analytics.create({
        data: {
          url_id: url.id,
          date: new Date(dateStr),
          clicks: clicks.length,
          countries: countryCounts,
          devices: deviceCounts,
          browsers: browserCounts,
          referers: refererCounts,
        },
      });
    }
  }

  console.log("✅ Created analytics data");

  // Print summary
  console.log("\n🎉 Seed completed successfully!");
  console.log("📊 Summary:");
  console.log(`   👥 Users: ${users.length}`);
  console.log(
    `     - Super Admins: ${users.filter((u) => u.role === Role.SUPER_ADMIN).length
    }`
  );
  console.log(
    `     - Admins: ${users.filter((u) => u.role === Role.ADMIN).length}`
  );
  console.log(
    `     - Regular Users: ${users.filter((u) => u.role === Role.USER).length}`
  );
  console.log(`   🔗 URLs: ${urls.length}`);
  console.log(`   👆 Clicks: ${totalClicks}`);
  console.log(`   📈 Analytics entries: ${await prisma.analytics.count()}`);

  console.log("\n🔐 Sample login credentials:");
  console.log("   🔴 Super Admin:");
  console.log(
    "     Email: superadmin@urlshortener.com | Password: password123"
  );
  console.log("   🟡 Admin:");
  console.log("     Email: admin@urlshortener.com | Password: password123");
  console.log("   🟢 Regular Users:");
  console.log("     Email: john@example.com | Password: password123");
  console.log("     Email: alice@example.com | Password: password123");
  console.log("     Email: bob@example.com | Password: password123");
  console.log("     Email: sarah@example.com | Password: password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
