import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "articulate-starlight-mw1xt",
  appId: "1:193161966560:web:904e77cceab1b26ff07185",
  apiKey: "AIzaSyDsD6TJq3q7q5CjOZkvvvFjxIckb-7scfk",
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, "ai-studio-841e49c8-87d1-474b-abe1-e38fe3f04406");

const articles = [
  {
    title: "Best Mutual Funds in India: Small Cap Guide",
    slug: "best-mutual-funds-india-small-cap",
    category: "Mutual Funds",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
    content: `
      <h2>Understanding Small Cap Mutual Funds</h2>
      <p>Small cap mutual funds invest a significant portion of their corpus in equity and equity-related instruments of small-cap companies. According to SEBI guidelines, small-cap companies are those ranked 251st and onwards in terms of market capitalization.</p>
      
      <h3>Why Invest in Small Cap Funds?</h3>
      <p>The primary attraction of small cap funds is their potential for high growth. Small companies have more room to expand compared to large, established corporations. This growth potential can translate into substantial returns for investors over the long term.</p>
      
      <ul>
        <li><strong>High Growth Potential:</strong> Ability to deliver multi-bagger returns.</li>
        <li><strong>Alpha Generation:</strong> Fund managers can find under-researched stocks that offer significant upside.</li>
      </ul>

      <h3>Risks Associated with Small Cap Funds</h3>
      <p>While the returns can be highly lucrative, small-cap funds come with a higher degree of risk. These companies are more vulnerable to economic downturns and market volatility. Liquidity can also be an issue, as trading volumes for small-cap stocks are generally lower.</p>
      
      <h3>Top Small Cap Funds in India (2024)</h3>
      <p>Here are some of the top-performing small cap funds to consider:</p>
      <ol>
        <li><strong>Nippon India Small Cap Fund:</strong> Known for its diversified portfolio and consistent performance.</li>
        <li><strong>SBI Small Cap Fund:</strong> Offers strong risk-adjusted returns with a focus on quality stocks.</li>
        <li><strong>Quant Small Cap Fund:</strong> Employs a unique predictive analytics model to identify growth opportunities.</li>
      </ol>

      <p>Investing in small cap funds requires patience and a high risk appetite. It's recommended to have an investment horizon of at least 7-10 years to ride out market volatility and realize the true growth potential.</p>
    `,
    metaTitle: "Best Small Cap Mutual Funds in India | Finance Guide",
    metaDescription: "Explore the best small cap mutual funds in India. Understand the risks, rewards, and top funds for high growth potential.",
    keywords: "small cap, mutual funds, india, investing, high growth",
    status: "Published",
    author: "Admin",
    readingTime: "6 min",
    createdAt: Date.now() - 100000
  },
  {
    title: "Large Cap Mutual Funds: Stability and Growth",
    slug: "large-cap-mutual-funds-india",
    category: "Mutual Funds",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    content: `
      <h2>What are Large Cap Mutual Funds?</h2>
      <p>Large cap mutual funds invest primarily in the top 100 companies by market capitalization. These companies are well-established, have a proven track record, and are often leaders in their respective industries.</p>
      
      <h3>Benefits of Large Cap Funds</h3>
      <p>Large cap funds are considered relatively safer than mid and small cap funds. They offer a stable investment avenue with steady, albeit moderate, growth potential.</p>
      
      <ul>
        <li><strong>Stability:</strong> Large companies are better equipped to weather economic storms.</li>
        <li><strong>Consistent Dividends:</strong> Many large-cap companies pay regular dividends, providing a steady income stream.</li>
        <li><strong>High Liquidity:</strong> These stocks are heavily traded, making it easy to buy and sell without impacting the price significantly.</li>
      </ul>

      <h3>Who Should Invest?</h3>
      <p>Large cap funds are ideal for conservative investors seeking equity exposure without the extreme volatility associated with smaller companies. They form the core of a well-diversified equity portfolio.</p>
      
      <h3>Top Large Cap Funds in India</h3>
      <p>Consider these top-rated large cap funds for your portfolio:</p>
      <ol>
        <li><strong>Mirae Asset Large Cap Fund:</strong> Consistently outperforms the benchmark with a robust stock selection process.</li>
        <li><strong>ICICI Prudential Bluechip Fund:</strong> Focuses on blue-chip companies with strong fundamentals.</li>
        <li><strong>Axis Bluechip Fund:</strong> Known for its quality-focused approach and downside protection.</li>
      </ol>

      <p>While large cap funds might not offer the explosive growth of small caps, they provide the necessary stability and steady compounding that every long-term portfolio needs.</p>
    `,
    metaTitle: "Top Large Cap Mutual Funds in India for Stability",
    metaDescription: "A comprehensive guide to large cap mutual funds in India. Learn about the benefits and top funds for stable, long-term growth.",
    keywords: "large cap, mutual funds, bluechip, stability, india",
    status: "Published",
    author: "Admin",
    readingTime: "5 min",
    createdAt: Date.now() - 50000
  },
  {
    title: "Mid Cap Mutual Funds: The Sweet Spot of Investing",
    slug: "mid-cap-mutual-funds-sweet-spot",
    category: "Mutual Funds",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80",
    content: `
      <h2>Exploring Mid Cap Mutual Funds</h2>
      <p>Mid cap mutual funds invest in companies ranked 101st to 250th by market capitalization. These companies are in their growth phase and have the potential to become the large caps of tomorrow.</p>
      
      <h3>The Risk-Reward Balance</h3>
      <p>Mid cap funds offer a middle ground between the stability of large caps and the explosive growth of small caps. They carry higher risk than large caps but generally offer better returns.</p>
      
      <ul>
        <li><strong>Growth Potential:</strong> Mid-sized companies are often more agile and can grow earnings faster than mature companies.</li>
        <li><strong>Reasonable Valuations:</strong> They may offer better value compared to highly priced large-cap stocks.</li>
      </ul>

      <h3>When to Choose Mid Caps?</h3>
      <p>Investors with a moderate to high risk tolerance and an investment horizon of 5-7 years should consider mid cap funds. They add a significant growth element to an equity portfolio without going to the extremes of small-cap investing.</p>
      
      <h3>Top Mid Cap Funds to Watch</h3>
      <p>Some notable mid cap funds include:</p>
      <ol>
        <li><strong>HDFC Mid-Cap Opportunities Fund:</strong> A veteran fund with a strong track record of identifying future leaders.</li>
        <li><strong>Kotak Emerging Equity Fund:</strong> Focuses on businesses with scalable models and strong management.</li>
        <li><strong>PGIM India Midcap Opportunities Fund:</strong> Known for its strong recent performance and dynamic sector allocation.</li>
      </ol>

      <p>Adding a mid cap fund to your portfolio can significantly enhance your overall returns, provided you can handle the associated market volatility.</p>
    `,
    metaTitle: "Best Mid Cap Mutual Funds | Balancing Risk and Reward",
    metaDescription: "Discover the potential of mid cap mutual funds. Learn how they balance risk and reward and explore top funds in India.",
    keywords: "mid cap, mutual funds, risk reward, growth investing",
    status: "Published",
    author: "Admin",
    readingTime: "7 min",
    createdAt: Date.now()
  }
];

async function seed() {
  console.log('Seeding articles...');
  for (const article of articles) {
    await addDoc(collection(db, 'articles'), article);
  }
  console.log('Successfully seeded articles!');
  process.exit(0);
}

seed().catch(console.error);
