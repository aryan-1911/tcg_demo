import { useTypedController } from '@hookform/strictly-typed';
import { anyUserOnlieOfflineDataAction, searchExistUserAction } from 'actions';
import { Button } from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { CreateMathModalContext } from 'context';
import firebase from 'firebase';
import { makeSelector } from 'helpers';
import { IUserProfileResp } from 'interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { MessagesReducerState } from 'reducers';

interface IMessageModalProps extends IModalProps {
  defaultValues: {
    username?: string;
    message?: string;
  };
}

function DirectChallengeSearchModal(props: any) {
  const dispatch = useDispatch();
  const { isPrompt, closeEditor,disableBackdropClick,defaultValues} = props;
  const [searchUsersList, setSearchUsersList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [info, setInfo]:any = useState({});

  let selectedUserId;
  let selectedUserName;
  if (searchUsersList !== undefined) {
    //@ts-ignore
    selectedUserId = searchUsersList?.find(user => user?.value === selectedOption)?.id;
    //@ts-ignore
    selectedUserName = searchUsersList?.find(user => user?.value === selectedOption)?.value;
  }

  const { username:myUserName } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );


  let isMe = true;

  if(!!myUserName && selectedUserName ){
    isMe =  myUserName === selectedUserName;
  }

  const methods = useForm({
    defaultValues: {
      username: defaultValues.username || '',
      message: defaultValues.message || '',
    },
  });

  const { isSearchLoading } = useSelector<any, MessagesReducerState>(makeSelector(['messagesReducer']))

  const {
    control,
    handleSubmit,
    errors,
    reset,
    setError,
    clearErrors,
  } = methods;

  useEffect(() => {
    if (defaultValues.username) {
      reset({
        username: defaultValues.username || '',
        message: defaultValues.message || '',
      });
      handleCheckUser(defaultValues.username);
    }
  }, [defaultValues.username]);

  const TypedController: any = useTypedController({ control });

  const submit = handleSubmit((data) => {
    // const msg = data.message.trim();
    //@ts-ignore
    let receiverId = searchUsersList?.find(user => user?.value === selectedOption).id;
  });
  
  const deFaultOptions = [
    { value: 'Enter Username', label: '' },
  ]

  const handleCheckUser = (username: string) => {
    if (!username) return false;
    dispatch(searchExistUserAction(username, {
      redirect: (usersList) => {
        if (!usersList) {
          setError('username', {
            type: 'required',
            message: 'User is not exist.',
          });
          return;
        }
        if (usersList.length > 0) {
          let userListOptions = usersList?.map((user) => ({ value: user.username, label: user.username, id: user.id }));
          setSearchUsersList(userListOptions);
        }
        clearErrors();
      },
    }));
  };


  let isOnlineFlag = (info?.state === 'online')?true:false;
  
  useEffect(() => {
    dispatch(anyUserOnlieOfflineDataAction({anyUserId:selectedUserId}));
  }, [selectedUserId]);

  const  {anyUserId}  = useSelector<any, any>(
    makeSelector(['userReducer', 'anyUserOnlineOfflineInfo']),
  );
  
  useEffect( () => {
    if(anyUserId ===  undefined) {return};
    let userStatusDatabaseRef = firebase.database().ref(`/${anyUserId}/info/isOnline`);
    userStatusDatabaseRef.on('value',snapshot => {
      let val = snapshot.val();
      if(val){
        setInfo(val);
      }
    })

  },[anyUserId,dispatch]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#fff',
      backgroundColor: state.isSelected ? '#f36c48' : 'transparent',
      ':focus, :hover, :active, :visited': {
        backgroundColor: state.isSelected ? '#f36c48' : '#5a61691a'
      },
      padding: '15px 25px',
      cursor: 'pointer',
      margin: 0,
      borderBottom: '1px solid #20212a',
    }),
    control: () => ({
      border: '1px solid #fff',
      color: '#fff',
      borderRadius: '12px',
      backgroundColor: 'transparent',
      padding: '0px 15px',
      height: '48px',
      zIndex: '2000',
    }),
    menu: base => ({
      ...base,
      zIndex: 100,
      cursor: 'pointer',
    }),
    menuList: styles => ({
      ...styles,
      background: '#30313b'
    }),
    singleValue: (provided, state) => {
      // const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, transition, color: '#fff', backgroundColor: 'transparent' };
    },
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'red',
      }
    },
  }

  const { openCreateMatchModal } = useContext(CreateMathModalContext);
  const history = useHistory();
  const handleRedirect = () => {
    closeEditor();
    if(!!anyUserId){
      return history.push(`/profile/${anyUserId}`);
    }
    return null;
  };

  const createMatchModal = () => {
    closeEditor();
    history.push(`/profile/${selectedUserId}`);
    return openCreateMatchModal();
  }

  return (
    <UniversalModal
      visible={isPrompt}
      title="Direct Challenge"
      disableBackdropClick
      onCancel={() => {
        closeEditor();
        setSearchUsersList([])
      }  
    }    
    className="category-editor-modal"
    >
      <FormProvider {...methods}>
        <form className="modal-form direct-search" onSubmit={submit}>
          <div className="modal-form__row">
            <div className="modal-form__col position--relative">
              <label className="input-label">username</label>
              <Select
                placeholder="Enter Username"
                // defaultValue={deFaultOptions} 
                options={searchUsersList}
                onInputChange={(e: any) => {
                  handleCheckUser(e);
                }
                }
                getOptionLabel={({ value }) => {
                  setSelectedOption(value);
                  return value;
                }}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                className={`MuiInput-formControl auto-username-dropdown`}
                styles={customStyles}
                classNamePrefix="auto-username"
                isClearable={true}
                backspaceRemovesValue={true}
              />
              {isSearchLoading && <div className='search-message-loading'><LoadingButton /></div>}
            </div>
          </div>
            <div className="btn-wrap">
              <Button onClick={ handleRedirect} disabled={selectedOption === '' || Boolean(errors.username)}  >View Profile</Button>
              <Button onClick={openCreateMatchModal({initialValues:{isDirectChallangeId:anyUserId}})} disabled={!isOnlineFlag} >Direct Challenge</Button>
            </div>
        </form>
      </FormProvider>
    </UniversalModal>
  );
}

export default DirectChallengeSearchModal;
