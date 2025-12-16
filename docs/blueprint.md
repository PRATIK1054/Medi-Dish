# **App Name**: MediDish

## Core Features:

- User Authentication and Profile Management: Secure user accounts with Firebase Authentication and detailed profile setup including medical conditions, medications, and dietary preferences. Utilizes Firestore to store user data.
- Intelligent Food-Drug Interaction Checker: Allows users to input medications and foods, checks for potential interactions using pre-computed matrix, and alerts the user of severity levels.
- Smart Recommendation Tool: Leverage a generative AI tool that uses information about drug and food interactions to intelligently generate tailored recommendations, alternative choices, and symptoms to watch for, enhancing the relevance of medical advice.
- Interactive Dashboard: Presents key stats like current medications, history, medication reminders and a shareable PDF summary of the interactions. Stores all data in Firestore
- Comprehensive Interaction Database: Curated database managed via Firebase Admin SDK that ensures that information on drug and food interactions is up-to-date.

## Style Guidelines:

- Primary color: Soft lavender (#D1C4E9), promoting a sense of calm and health awareness.
- Background color: Light grey (#F5F5F5), offering a clean and accessible user experience.
- Accent color: Deep purple (#7E57C2) to highlight critical information and calls to action, ensuring users easily identify vital areas.
- Headline font: 'Belleza' sans-serif font for headers, paired with 'Alegreya' serif for body text, balancing aesthetics and readability. The sans-serif creates a fashionable feel for brief displays, complemented by the serif’s ease on longer text.
- Use a set of consistent icons in a minimalist style to visually represent medication types, food categories, and interaction severities.
- Implement a card-based layout with clear visual hierarchy, ensuring content is easy to scan and interactions are intuitive on mobile devices.
- Incorporate subtle transitions and feedback animations (e.g., when checking interactions) to maintain user engagement without being intrusive.