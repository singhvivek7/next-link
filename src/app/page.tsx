"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  Link,
  Zap,
  BarChart3,
  Shield,
  Copy,
  ExternalLink,
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  Check,
  MousePointer2,
} from "lucide-react";
import { handleShortUrl } from "@/actions/short-url";

const NextURLLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);

  // Smooth mouse tracking - always call hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 400 });

  // Create transforms unconditionally
  const mouseTransformX1 = useTransform(smoothMouseX, [0, 1920], [-50, 50]);
  const mouseTransformY1 = useTransform(smoothMouseY, [0, 1080], [-50, 50]);
  const mouseTransformX2 = useTransform(smoothMouseX, [0, 1920], [50, -50]);
  const mouseTransformY2 = useTransform(smoothMouseY, [0, 1080], [50, -50]);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
    };

    // Only add event listener on client-side
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const handleShortenUrl = async () => {
    if (!currentUrl) return;
    setIsShortening(true);

    // Simulate API call
    const { data } = await handleShortUrl({
      url: currentUrl,
    });
    setShortenedUrl(`http://localhost:3000/${data.short_url}`);
    setIsShortening(false);
  };

  const copyToClipboard = async () => {
    if (!shortenedUrl || typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shortenedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate short URLs in milliseconds with our edge-optimized infrastructure",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time insights with detailed click tracking, geographic data, and device analytics",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with custom domains, SSL, and 99.99% uptime SLA",
    },
  ];

  const stats = [
    { number: "10M+", label: "URLs Shortened" },
    { number: "500K+", label: "Active Users" },
    { number: "99.99%", label: "Uptime" },
    { number: "180+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Dynamic Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background"></div>
        <motion.div
          style={{
            x: isClient ? mouseTransformX1 : 0,
            y: isClient ? mouseTransformY1 : 0,
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          style={{
            x: isClient ? mouseTransformX2 : 0,
            y: isClient ? mouseTransformY2 : 0,
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-50 px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Link className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NextURL
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {["Features", "Pricing", "Analytics", "Docs"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 pb-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-lg mx-4"
            >
              <div className="flex flex-col space-y-4 pt-4 px-4">
                {["Features", "Pricing", "Analytics", "Docs"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-left mt-4"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY }}
        className="relative z-10 px-6 py-20 md:py-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-border shadow-lg"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Next.js 15
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
          >
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Shorten URLs
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Amplify Impact
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform complex URLs into powerful, trackable links. Get deep
            insights, boost engagement, and scale your digital presence with
            enterprise-grade reliability.
          </motion.p>

          {/* URL Shortener Demo */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                  />
                  {currentUrl && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px hsl(var(--primary) / 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShortenUrl}
                  disabled={isShortening || !currentUrl}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-lg transition-all duration-200"
                >
                  {isShortening ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Shorten
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {shortenedUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mt-6 p-6 bg-background/50 rounded-xl border border-border"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Link className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-green-600 dark:text-green-400 font-mono text-lg truncate">
                          {shortenedUrl}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyToClipboard}
                          className="p-3 bg-secondary/20 hover:bg-secondary/30 rounded-xl transition-colors duration-200 group relative"
                        >
                          <AnimatePresence mode="wait">
                            {isCopied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check className="w-5 h-5 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-secondary/20 hover:bg-secondary/30 rounded-xl transition-colors duration-200 group"
                        >
                          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px hsl(var(--primary) / 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg shadow-xl group"
            >
              Start Free Trial
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-border px-10 py-4 rounded-xl font-semibold text-lg hover:bg-accent transition-all duration-200 group"
            >
              <MousePointer2 className="w-5 h-5 inline mr-2 group-hover:text-primary transition-colors" />
              Interactive Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        className="relative z-10 px-6 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Scale & Performance
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade features designed for teams that demand
              reliability, insights, and seamless integration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card/40 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        className="relative z-10 px-6 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Simple,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Upgrade or downgrade at
              any time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-card/40 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group relative"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-muted-foreground">
                  Perfect for personal use
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Free forever
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "1,000 links per month",
                  "Basic analytics",
                  "Custom back-half",
                  "Standard support",
                  "7-day link history",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Get Started Free
              </motion.button>
            </motion.div>

            {/* Pro Plan - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-gradient-to-b from-primary/5 to-secondary/5 backdrop-blur-sm p-8 rounded-2xl border-2 border-primary/50 hover:border-primary/70 transition-all duration-300 group relative transform scale-105"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </motion.div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-muted-foreground">For growing businesses</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    $19
                  </span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Billed annually ($15/month)
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "50,000 links per month",
                  "Advanced analytics & insights",
                  "Custom domains (5)",
                  "Branded links",
                  "Team collaboration",
                  "Priority support",
                  "Unlimited link history",
                  "API access",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px hsl(var(--primary) / 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200"
              >
                Start Pro Trial
              </motion.button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-card/40 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group relative"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-muted-foreground">For large organizations</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Custom pricing available
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited links",
                  "Advanced team management",
                  "Custom domains (unlimited)",
                  "White-label solution",
                  "Advanced integrations",
                  "Dedicated support",
                  "SLA guarantee",
                  "Custom features",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Contact Sales
              </motion.button>
            </motion.div>
          </div>

          {/* FAQ or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground text-lg">
              All plans include SSL certificates, 99.9% uptime SLA, and can be
              cancelled anytime.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise Security</span>
              </span>
              <span className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </span>
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>30-Day Money Back</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm p-12 md:p-16 rounded-3xl border border-primary/20 shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Links?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 500,000+ users who trust NextURL for their link management.
              Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px hsl(var(--primary) / 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-12 py-5 rounded-xl font-bold text-xl shadow-xl"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary hover:text-primary/80 font-bold text-xl flex items-center group"
              >
                View Pricing
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-16 border-t border-border bg-card/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Link className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NextURL
              </span>
            </div>

            <div className="flex items-center space-x-6">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-accent"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              &copy; 2025 NextURL. Crafted with ❤️ for the modern web.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default NextURLLanding;
