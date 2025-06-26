# Trainetic AI

**Fullstack AI fitness platform generating personalized workout programs with real-time progress tracking and intelligent coaching.**

## Features

- **AI-Powered Program Generation** - Create personalized workout programs in under 3 minutes
- **Real-time Progress Tracking** - Monitor your fitness journey with detailed analytics
- **Intelligent Coaching** - Get AI-powered guidance and form corrections
- **Personalized Nutrition Plans** - Customized meal plans based on your goals and restrictions
- **Multi-Equipment Support** - Programs for home gym, full gym, or bodyweight only
- **Safety Protocols** - Built-in AI safety systems for injury prevention
- **User Authentication** - Secure login and profile management
- **Program Gallery** - Browse 500+ AI-generated fitness programs from other users

## Tech Stack

- **Frontend**: Next.js with React and TypeScript
- **Authentication**: Clerk API
- **Backend**: Convex
- **AI**: OpenAI GPT models
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Clerk account for authentication
- Convex account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trainetic-ai.git
   cd trainetic-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your keys:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   OPENAI_API_KEY=your_openai_key
   CONVEX_DEPLOY_KEY=your_convex_deploy_key
   ```

4. **Run the project**
   ```bash
   npx convex dev
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Key Features

### Program Generation
- Instant AI-powered workout creation
- Customizable based on fitness level, goals, and available equipment
- Support for weight loss, muscle gain, and general fitness goals

### Progress Tracking
- Daily calorie tracking
- Workout completion monitoring
- Performance analytics and insights

### Safety & Personalization
- AI safety protocols for injury prevention
- Personalized based on age, fitness level, and schedule
- Adaptive programs that evolve with user progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with 💜 by **Mustiii**

[Get Started Now](https://trainaticai.vercel.app/)
