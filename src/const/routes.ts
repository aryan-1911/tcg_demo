interface IRoute {
  ROOT: string;
  DETAILS?: string;
}

type PrepareRouteFn = (id: number | string) => string;

interface IRootChildren<T> {
  pathname: string;
  children: {
    [key in keyof T]: string;
  };
}

export const baseURL = '';

// AUTH
const signIn = `${baseURL}/login`;
export const AuthRoute = {
  ROOT: signIn,
  FORGOT_PASSWORD: `${signIn}/forgot-password`,
};


// HOW TO PLAY
export const howToPlay = `${baseURL}/howtoplay`;


// REGISTRATION
const registration = `${baseURL}/user`;
// const registration = `${baseURL}/signup`;

export const RegistrationRoute = {
  ROOT: registration,
  USER_PROFILE_INFO: `${registration}/profile-info`,
  EMAIL_CONFIRMATION: `${registration}/verify_email`,
  RESET_PASSWORD: `${registration}/remind_password_change/:id`,
};

// MATCHES
const matches = `${baseURL}/matches`;
export const MatchesRoute = {
  ROOT: matches,
  SPECIFIC: `${matches}/all/:id`,
  getSpecificRoute: (id: string) => `${matches}/all/${id}`,
};


// PODS
const pods = `${baseURL}/pods`;
export const PodsRoute = {
  ROOT: pods,
};


//LEADERBOARD 
const leaderboard = `${baseURL}/leaderboard`;
export const LeaderboardRoute = {
  ROOT: leaderboard,
};

//Chat Room
const chatroom = `${baseURL}/chatroom`;
export const ChatRoomRoute = {
  ROOT: chatroom,
};

//Special Events
const specialevents = `${baseURL}/specialevents`;
export const SpecialEventsRoute = {
  ROOT: specialevents,
};


// MESSAGES
const messages = `${baseURL}/messages`;
export const MessagesRoute = {
  ROOT: messages,
  SEND_MESSAGE: `${messages}/:username`,
  getSendMessageRoute: (username: string) => `${messages}/${username}`,
};

// DISPUTE
const dispute = `${baseURL}/dispute`;
export const DisputeRoute = {
  ROOT: dispute,
};

// PROFILE
const profile = `${baseURL}/profile`;
export const ProfileRoute = {
  ROOT: profile,
  EDIT_USER_PROFILE: `${profile}/edit-profile`,
  USER_PROFILE_SETTINGS: `${profile}/user-settings`,
  SPECIFIC: `${profile}/:id`,
  getSpecificRoute: (id: string) => `${profile}/${id}`,
};

// DEPOSIT
const deposit = `${baseURL}/deposit`;
export const DepositRoute = {
  ROOT: deposit,
};

// FAQ'S
const faqs = `${baseURL}/faqs`;
export const FaqsRoute = {
  ROOT: faqs,
};

const blogs = `${baseURL}/blogs`

export const BlogRoute = {
  ROOT: blogs
}

// CONTACTS
const contacts = `${baseURL}/contact-us`;
export const ContactsRoute = {
  ROOT: contacts,
};

// STATIC PAGES TERMS & CONDITIONS
const staticPages = `${baseURL}/static-page`;
export const StaticPagesRoute = {
  ROOT: staticPages,
  TERMS: `${staticPages}/terms`,
  PRIVACY_POLICY: `${staticPages}/privacy`,
  COOKIE_POLICY: `${staticPages}/cookie`,
  RULES_OF_THE_GAME: `${staticPages}/rules`,
};

export const showSignInButton = [
  RegistrationRoute.ROOT,
  RegistrationRoute.EMAIL_CONFIRMATION,
];

export const LandingPageRouter = {
  ROOT: `${baseURL}/home`
}
