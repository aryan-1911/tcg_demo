import { useTypedController } from '@hookform/strictly-typed';
import { getAllDialogsAction, getDialogAction, searchExistUserAction, sendMessageAction } from 'actions';
import { Button, FormTextArea } from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { ShowToastError } from 'Components/Toast';
import { REQUIRED } from 'const';
import { makeSelector } from 'helpers';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { MessagesReducerState } from 'reducers';



interface IMessageModalProps extends IModalProps {
  defaultValues: {
    username?: string;
    message?: string;
  };
}

export const MessageModal = (props: IMessageModalProps) => {
  const dispatch = useDispatch();
  const { closeEditor, isPrompt, defaultValues } = props;
  const [receiverId, setReceiverId] = useState('');
  const [searchUsersList, setSearchUsersList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  let selectedUserId;
  if (searchUsersList !== undefined) {
    //@ts-ignore
    // selectedUserId = searchUsersList?.find(user => user?.value === selectedOption).id;
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
    const msg = data.message.trim();
    //@ts-ignore
    let receiverId = searchUsersList?.find(user => user?.value === selectedOption).id;
    if (msg) {
      dispatch(
        sendMessageAction(
          { receiver: receiverId, message: msg },
          {
            redirect: () => {
              dispatch(getAllDialogsAction(null));
              dispatch(getDialogAction({ id: receiverId, queryParam: {} }));
              setSearchUsersList([]);
            },
          },
        ),
      );
      closeEditor();
    } else {
      ShowToastError({
        title: "Message Is Empty",
        subtitle: "Please write something.",
        btnTitle: "Ok"
      })
    }
  });

  const deFaultOptions = [
    { value: 'Enter Username', label: '' },
  ]

  const handleCheckUser = (username: string) => {
    if (!username) return false;
    // dispatch(
    //   checkExistUserAction(username, {
    //     redirect: (existId) => {
    //       if (!existId) {
    //         setError('username', {
    //           type: 'required',
    //           message: 'User is not exist.',
    //         });
    //         setReceiverId('');
    //         return;
    //       }
    //       setReceiverId(existId);
    //       clearErrors();
    //     },
    //   }),
    // );
    // Show the list of usersname available based on search results.
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


  return (
    <UniversalModal
      title="New message"
      visible={isPrompt}
      onCancel={() => {
        closeEditor();
        setSearchUsersList([])
      }
      }
      className="category-editor-modal"
    >
      <FormProvider {...methods}>
        <form className="modal-form" onSubmit={submit} >
          {/* <div className="modal-form__row">
            <div className="modal-form__col">
              <TypedController
                name="username"
                rules={REQUIRED}
                render={(props) => (
                  <FormTextInput
                    placeholder="Enter username"
                    name="username"
                    label="username"
                    error={errors.username}
                    {...props}
                    onChange={(e) => {
                      const username = e.target.value;
                      handleCheckUser(username);
                      props.onChange(e);
                    }}
                  />
                )}
              />
            </div>
          </div>         */}
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
                styles={customStyles}
                className={`MuiInput-formControl auto-username-dropdown`}
                classNamePrefix="auto-username"
                isClearable={true}
                backspaceRemovesValue={true}
              />
              {isSearchLoading && <div className='search-message-loading'><LoadingButton /></div>}
            </div>
          </div>
          <div className="modal-form__row">
            <div className="modal-form__col">
              <TypedController
                name="message"
                rules={REQUIRED}
                render={(props) => (
                  <FormTextArea
                    name="textarea"
                    label="Message"
                    placeholder="Enter message"
                    error={errors.message}
                    {...props}
                  />
                )}
              />
            </div>
          </div>
          <div className="modal-form__row">
            <div className="modal-form__col">
              <Button
                className="modal-form__submit"
                onClick={submit}
                disabled={selectedOption === '' || Boolean(errors.username)}
              >
                send message
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </UniversalModal>
  );
};