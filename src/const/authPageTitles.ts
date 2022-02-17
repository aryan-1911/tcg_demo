import { AuthRoute, RegistrationRoute } from './routes';

export const authPageTitles = {
  [AuthRoute.FORGOT_PASSWORD]: 'Forgot your password?',
  [RegistrationRoute.RESET_PASSWORD]: 'Reset password',
  [AuthRoute.ROOT]: 'Hello, welcome back!',
  [RegistrationRoute.ROOT]: 'Sign up to win money playing games!',
  [RegistrationRoute.USER_PROFILE_INFO]: 'A few more steps',
};

export const authPageSubTitles = {
  [AuthRoute.FORGOT_PASSWORD]: 'Don’t worry! Resetting your password is easy.',
  [RegistrationRoute.RESET_PASSWORD]:
    'Almost done, just enter your new password below.',
  [AuthRoute.ROOT]: 'May the odds be ever in your favor.',
  [RegistrationRoute.USER_PROFILE_INFO]:
    'These fields are required to be filled in once you are ready to play the match.',
};
