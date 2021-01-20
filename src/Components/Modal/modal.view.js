import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from 'esther-components';
import { format } from 'date-fns';
import { useMonthContext } from '../../dateContext';
import monthAction from '../../dateContext/types';
import styles from './modal.module.css';
import ModalEvent from './ModalEvents/modalEvent.view';

const Modal = (props) => {
  const { open } = props;
  const { state, dispatch } = useMonthContext();
  const [create, setCreate] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (
      ref.current
            && !ref.current.contains(event.target)
            && state.modal
    ) {
      dispatch({ type: monthAction.MONTH__CLOSE_MODAL });
      setCreate(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  const handleCreate = () => {
    setCreate(true);
  };
  return (
    <>
      {open && (
      <div className={styles.root}>
        <div className={styles.container} ref={ref}>
          <div className={styles.title}>
            <Text tagHtml="h3" align="center">{format(state.day, "EEEE dd 'of' MMMM YYY")}</Text>
          </div>
          {state.filteredEvents.map((ev) => (
            <ModalEvent ev={ev} />
          ))}
          {create && (
            <ModalEvent
              ev={{
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                id: '',
                year: '',
                month: '',
                day: '',
              }}
              create={create}
            />
          )}
          <div className={styles.buttonContainer}>
            <span onClick={handleCreate} className={styles.createButton}>
              <Icon
                colo="estherGreen"
                size="32px"
                name="addCircle"
              />
            </span>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Modal;
