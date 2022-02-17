import { prepareCreditCardRequest } from 'helpers';
import {
  IPartialUserInfoEditing,
  IPartialUserInfoEditingRequest,
  ISpecificProfileResp,
  IUserProfileResp
} from 'interfaces';

interface IDefaultValues {
  username: string;
  fullname: string;
  birthdate: string;
  phone: number;
  showIncome: boolean;
  gamePokemon: string;
  gameMtg: string;
  gameYugioh: string;
  gameMagic: string;
  country_id: 1;
  nicknames: any;
}

export const isFullProfileUser = (
  userData: IUserProfileResp | ISpecificProfileResp,
): boolean => {
  return Boolean('fullname' in userData);
};

export const profileDefaultValues = (userData: IDefaultValues) => {
  if (userData.username !== '') {
    return {
      username: `${userData?.username}`,
      fullname: `${userData?.fullname}`,
      birthdate: '1999-01-01',
      phone: 8888888,
      showIncome: true,
      gamePokemon: `${userData?.nicknames['POKEMON TCGO']}`,
      gameMtg: `${userData?.nicknames['MTG ARENA']}`,
      gameYugioh: `${userData?.nicknames['YU-GI-OH MASTER DUEL']}`,
      gameMagic: `${userData?.nicknames['MAGIC THE GATHERING ONLINE']}`,
      country_id: 1,
    };
  }
};

export const preparePartialUserEditInfo = (
  userData: IPartialUserInfoEditing,
): IPartialUserInfoEditingRequest => {
  const { creditCard, phone, avatar } = userData;

  const phoneArr = phone.split(' ');

  const stripeCard = prepareCreditCardRequest(creditCard);

  return {
    avatar,
    stripeCard,
    phone: Number(phoneArr[1]),
    prefix: Number(phoneArr[0]),
    gamePokemon: userData.gamePokemon,
    gameMtg: userData.gameMtg,
    gameYugioh: userData.gameYugioh,
    gameMagic: userData.gameMagic,
  };
};
