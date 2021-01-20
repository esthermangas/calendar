import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Icon, Text,
} from 'esther-components';
import { format } from 'date-fns';
import styles from './modalEvent.module.css';
import useComponentVisible from '../../../hooks';
import { useMonthContext } from '../../../dateContext';
import monthAction from '../../../dateContext/types';

const ModalEvent = (props) => {
  const { ev, create } = props;
  const { state, dispatch } = useMonthContext();
  const [data, setData] = useState({
    title: '',
    description: '',
    startDate: format(state.day, "YYY-MM-dd'T'HH:mm"),
    endDate: format(state.day, "YYY-MM-dd'T'HH:mm"),
  });
  const {
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();
  const timeStarDate = !create ? format(new Date(ev.startDate), 'HH:mm') : undefined;
  const timeEndDate = !create ? format(new Date(ev.endDate), 'HH:mm') : undefined;
  const handleChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const handleOnMod = () => {
    setData({ ...ev });
    setIsComponentVisible(true);
  };
  const handleOffMod = () => {
    setIsComponentVisible(false);
  };
  const sendData = () => {
    const date = new Date(data.startDate);
    const finalData = {
      ...data, year: date.getFullYear(), month: date.getMonth(), day: date.getDate(),
    };
    const url = create ? 'http://localhost:3001/events' : `http://localhost:3001/events/${ev.id}`;
    const method = create ? 'POST' : 'PATCH';
    fetch(url, {
      method,
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(finalData),
    }).then((res) => res.json()).then(() => {
      setIsComponentVisible(false);
      dispatch({ type: monthAction.MONTH__CLOSE_MODAL });
    });
  };
  const handleDeleteEvent = () => {
    fetch(`http://localhost:3001/events/${ev.id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
    }).then((res) => res.json()).then(() => {
      setIsComponentVisible(false);
      dispatch({ type: monthAction.MONTH__CLOSE_MODAL });
    });
  };
  const handleCloseMod = (open) => {
    if (!open) {
      setIsComponentVisible(false);
    }
  };
  const startDataFinal = !create ? format(new Date(ev.startDate), 'dd-MMM-YYY HH:mm') : undefined;
  const endDataFinal = !create ? format(new Date(ev.endDate), 'dd-MMM-YYY HH:mm') : undefined;
  const titlePanel = `${ev.title} from: ${timeStarDate} - to ${timeEndDate}`;
  return (
    <div className={styles.modalContentContainer}>
      <ExpansionPanel onClick={handleCloseMod}>
        <ExpansionPanelSummary isExpansionPanelSummary>
          {!create && (titlePanel)}
          {create && (
            'Add new event'
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails isExpansionPanelDetails>
          {!isComponentVisible && !create && (
            <div className={styles.expansionPanelContent}>
              <div className={styles.text}>
                <Text>{ev.description}</Text>
              </div>
              <div className={styles.text}>
                <Text>
                  {`Start: ${startDataFinal}`}
                </Text>
              </div>
              <div className={styles.text}>
                <Text>
                  {`Finish: ${endDataFinal}`}
                </Text>
              </div>
              <span className={styles.editButton} onClick={handleOnMod}>
                <Icon name="edit" color="cadetBlue" size="26px" />
              </span>
            </div>
          )}
          {(isComponentVisible || create) && (
            <div className={styles.expansionPanelContent}>
              <div>
                <input
                  className={styles.input}
                  value={data.title}
                  onChange={(e) => handleChange(e, 'title')}
                />
              </div>
              <div>
                <textarea
                  className={styles.inputDescription}
                  value={data.description}
                  onChange={(e) => handleChange(e, 'description')}
                />
              </div>
              <div>
                <input
                  className={styles.input}
                  type="datetime-local"
                  defaultValue={data.startDate}
                  onChange={(e) => handleChange(e, 'startDate')}
                />
              </div>
              <div>
                <input
                  className={styles.input}
                  type="datetime-local"
                  defaultValue={data.endDate}
                  onChange={(e) => handleChange(e, 'endDate')}
                />
              </div>
              <div className={styles.buttonsContainer}>
                {!create && (
                  <>
                    <span className={styles.closeModButton} onClick={handleOffMod}>
                      <Icon name="cross" color="tomato" size="26px" />
                    </span>
                    <span className={styles.deleteButton} onClick={handleDeleteEvent}>
                      <Icon name="trashFull" size="26px" color="estherGreen" />
                    </span>
                  </>
                )}
                <span className={styles.sendButton} onClick={sendData}>
                  <Icon name="send" color="cadetBlue" size="26px" />
                </span>
              </div>
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

ModalEvent.defaultProps = {
  create: false,
};

ModalEvent.propTypes = {
  ev: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  create: PropTypes.bool,
};

export default ModalEvent;
