/**
 * Anniversary Story & Configuration Data
 * Source of truth for Dikpal and Jili's 2nd Anniversary celebration.
 * All narrative copy is editable here.
 */

export interface AnniversaryData {
  couple: {
    hisName: string;
    herName: string;
    hisNickname: string;
    herNickname: string;
    language: string;
  };
  dates: {
    proposalDate: string;
    proposalTime: string;
    proposalFormatted: string;
    anniversaryDate: string;
    yearsTogether: number;
  };
  audio: {
    enabledByDefault: boolean;
    localAudioPath: string;
  };
  chapters: {
    chapter1: {
      title: string;
      subtitle: string;
      hint: string;
    };
    chapter2: {
      heading: string;
      body: string;
      contextNote: string;
    };
    chapter3: {
      timeBadge: string;
      dateBadge: string;
      headline: string;
      subline: string;
      momentText: string;
    };
    chapter4: {
      heading: string;
      subheading: string;
      instructions: string;
    };
    chapter5: {
      heading: string;
      paragraphs: string[];
    };
    chapter6: {
      heading: string;
      subheading: string;
      reasons: Array<{
        title: string;
        description: string;
      }>;
    };
    chapter7: {
      heading: string;
      paragraphs: string[];
    };
    chapter8: {
      prelude: string;
      revealTitle: string;
      revealSubtitle: string;
      signature: string;
    };
    chapter9: {
      salutation: string;
      subtitle: string;
      paragraphs: string[];
      closing: string;
      signoff: string;
      replayPrompt: string;
    };
  };
}

export const ANNIVERSARY_DATA: AnniversaryData = {
  couple: {
    hisName: "Dikpal",
    herName: "Jili",
    hisNickname: "Pol",
    herNickname: "Munchkin",
    language: "English",
  },
  dates: {
    proposalDate: "2024-11-04",
    proposalTime: "1:00 AM",
    proposalFormatted: "November 4, 2024",
    anniversaryDate: "2026-11-04",
    yearsTogether: 2,
  },
  audio: {
    enabledByDefault: false,
    localAudioPath: "/assets/audio/bgm.mp3",
  },
  chapters: {
    chapter1: {
      title: "A Universe That Exists Because of You",
      subtitle: "Somewhere among all the stars, a story was waiting to begin.",
      hint: "Scroll down gently to awaken the cosmos",
    },
    chapter2: {
      heading: "A Connection, Unexpectedly",
      body: "Sometimes, the most important chapters begin with something as small as a conversation.",
      contextNote: "Two distant paths began curving into the same orbit, turning ordinary days into something quietly extraordinary.",
    },
    chapter3: {
      timeBadge: "1:00 AM",
      dateBadge: "November 4, 2024",
      headline: "When Midnight Changed Everything",
      subline: "At around 1 AM, on November 4, 2024, one question changed the direction of my universe.",
      momentText: "And you said yes.",
    },
    chapter4: {
      heading: "Two Years of Little Universes",
      subheading: "Two years of little moments that became some of my favourite parts of life.",
      instructions: "Hover or tap any memory sphere to bring it closer",
    },
    chapter5: {
      heading: "You Stayed, Even When I Was Imperfect",
      paragraphs: [
        "I know I haven't always been the easiest person to love. I've had my imperfect moments, and there are parts of myself I still want to improve.",
        "But you've stood beside me through so much, and you've shown me a kind of love I never want to take for granted.",
        "Thank you for loving me, even when I'm still learning. I want to keep growing, keep becoming a better partner, and keep learning how to love you in the ways you deserve.",
      ],
    },
    chapter6: {
      heading: "Every Star Is a Reason",
      subheading: "Connected across our sky, each light holds a piece of why you mean the world to me.",
      reasons: [
        {
          title: "Your Unwavering Patience",
          description: "For giving me grace and a safe harbor even when my skies were stormy.",
        },
        {
          title: "The Warmth in Your Laughter",
          description: "That effortless laugh that instantly turns the hardest days into peace.",
        },
        {
          title: "The Small Everyday Details",
          description: "Your expressions, the sweet way you care, and how you brighten any room you walk into.",
        },
        {
          title: "Growing Together",
          description: "Learning together with honesty, humor, and a commitment to choose each other every day.",
        },
      ],
    },
    chapter7: {
      heading: "A Universe Still Waiting for Us",
      paragraphs: [
        "Two years have carved an unforgettable journey, yet the horizon ahead feels infinitely wider and full of wonder.",
        "There are quiet mornings yet to come, places waiting to be discovered, silly inside jokes not yet spoken, and dreams waiting to unfold.",
        "Here's to continuing to choose one another, walking through both ordinary and extraordinary days side by side.",
      ],
    },
    chapter8: {
      prelude: "Two years ago, at around 1 AM, you said yes.",
      revealTitle: "Happy Second Anniversary, Jili.",
      revealSubtitle: "From your Pol, forever.",
      signature: "November 4, 2024 — November 4, 2026 & Beyond",
    },
    chapter9: {
      salutation: "My sweetest Munchkin,",
      subtitle: "Happy two years to us.",
      paragraphs: [
        "Sometimes I think about how unexpectedly our story began. A conversation became something precious, and then came that night at around 1 AM when I asked you to be mine. You said yes, and November 4 became a date I'll always hold close to my heart.",
        "I know I'm not perfect. I can be immature, difficult, and sometimes let my anger get the better of me. I have things I want to work on, and I never want to take your patience or your love for granted.",
        "Thank you for being beside me, for loving me through my imperfect moments, and for giving me so many reasons to keep growing. You deserve a love that keeps learning, listening, and showing up, and I want to keep working toward being that partner for you.",
        "You've become such a beautiful part of my world, Munchkin. Of all the stars in this enormous universe, you're still the person I would look for.",
        "Two years have passed since you said yes, and if I could return to the beginning, knowing everything I know now, I'd still choose you.",
        "I love you, my sweet babygirl. I want to keep making memories with you, keep laughing with you, keep growing with you, and keep choosing you for all the days that come after this one.",
      ],
      closing: "Forever your Pol,",
      signoff: "Dikpal",
      replayPrompt: "Travel Through Our Universe Again",
    },
  },
};
