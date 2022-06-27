import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Button,
} from '@mui/material';
// import { Widget, addResponseMessage } from 'react-chat-widget';
import {MuiChat, ChatController} from 'chat-ui-react';
import logo from '../assets/logo.png';
import { teachers, subjects } from '../Utils';
import chat from '../assets/chat.png';

import Header  from '../header';
export default function Dashboard() {
 
  const queryParams =  new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const [openChat, setChat] = useState(false);
  const subject = subjects.filter((eachSubject) => eachSubject.id == id)[0].name;
  const teachersList = teachers.filter((eachTeacher) => eachTeacher.subjectId == id);
  const [searchResult, setSearchResult] = useState(teachersList);

  const [chatCtl] = React.useState(new ChatController({
    showDateTime: true,
  }));

  React.useMemo(async () => {
    // Chat content is displayed using ChatController
    // await chatCtl.addMessage({
    //   type: 'text',
    //   content: `Hello, What's your name.`,
    //   self: false,
    // });
    // const name = await chatCtl.setActionRequest({ type: 'text', always: true });
    echo(chatCtl);
    // const nam1e = await chatCtl.addMessage({ type: 'text', always: true, self: false });
  }, [chatCtl]);
  // useEffect(() => {
  //   addResponseMessage('Welcome to this **awesome** chat!');
  // }, []);

  // const handleNewUserMessage = (newMessage) => {
  //   console.log(`New message incoming! ${newMessage}`);
  //   // Now send the message throught the backend API
  // };
  const onSearch = (e) => {
    let result = teachersList.filter((eachName) => eachName.name.includes(e.target.value));
    setSearchResult(result);
    if (e.target.value == '') {
      setSearchResult(teachersList);
    }
  }
  return (
    <>
      <Header />
      <div>
        <h3>{subject}</h3>
        <div class='side-header-section'>
          <h3>Available Teachers</h3>
          <div class='search-box'>
            <input type='text' class='search-input' placeholder='Search Teacher...' onChange={(e) => onSearch(e)} />
          </div>
        </div>
        <div className='subjectSection'>
          {
            searchResult.map((eachName) => <div className='subjectBlock'><div>{eachName.name}</div><div class='subject-info'> <div>{eachName.info}</div><div><img src={chat} width='30px'onClick={() => {setChat((value) => !value)} } /></div></div></div>)
          }
        </div>
        {openChat ?<div className='chatBlock'><MuiChat chatController={chatCtl} /></div> : null};
      </div>
    </>
  );
}

async function echo(chatCtl) {
  
  const text = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: 'Enter text here',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `Hi`,
    self: false,
    avatar: '-',
  });
  // await chatCtl.addMessage({
  //   type: 'text',
  //   content: `You have entered:\n${text.value}`,
  //   self: false,
  //   avatar: '-',
  // });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your gender?`,
    self: false,
    avatar: '-',
  });
  const sel = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'man',
        text: 'Man',
      },
      {
        value: 'woman',
        text: 'Woman',
      },
      {
        value: 'other',
        text: 'Other',
      },
    ],
  });
  // await chatCtl.addMessage({
  //   type: 'text',
  //   content: `You have selected ${sel.value}.`,
  //   self: false,
  //   avatar: '-',
  // });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite fruit?`,
    self: false,
    avatar: '-',
  });
  const mulSel = await chatCtl.setActionRequest({
    type: 'multi-select',
    options: [
      {
        value: 'apple',
        text: 'Apple',
      },
      {
        value: 'orange',
        text: 'Orange',
      },
      {
        value: 'none',
        text: 'None',
      },
    ],
  });
  // await chatCtl.addMessage({
  //   type: 'text',
  //   content: `You have selected '${mulSel.value}'.`,
  //   self: false,
  //   avatar: '-',
  // });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite picture?`,
    self: false,
    avatar: '-',
  });
  const file = (await chatCtl.setActionRequest({
    type: 'file',
    accept: 'image/*',
    multiple: true,
  }));
  await chatCtl.addMessage({
    type: 'jsx',
    content: (
      <div>
        {file.files.map((f) => (
          <img
            key={file.files.indexOf(f)}
            src={window.URL.createObjectURL(f)}
            alt="File"
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
      </div>
    ),
    self: false,
    avatar: '-',
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `Please enter your voice.`,
    self: false,
    avatar: '-',
  });
  const audio = (await chatCtl
    .setActionRequest({
      type: 'audio',
    })
    .catch(() => ({
      type: 'audio',
      value: 'Voice input failed.',
      avatar: '-',
    })));
  await (audio.audio
    ? chatCtl.addMessage({
        type: 'jsx',
        content: (
          <a href={window.URL.createObjectURL(audio.audio)}>Audio downlaod</a>
        ),
        self: false,
        avatar: '-',
      })
    : chatCtl.addMessage({
        type: 'text',
        content: audio.value,
        self: false,
        avatar: '-',
      }));

  await chatCtl.addMessage({
    type: 'text',
    content: `Please press the button.`,
    self: false,
    avatar: '-',
  });
  const good = await chatCtl.setActionRequest({
    type: 'custom',
    Component: GoodInput,
  });
  // await chatCtl.addMessage({
  //   type: 'text',
  //   content: `You have pressed the ${good.value} button.`,
  //   self: false,
  //   avatar: '-',
  // });

  echo(chatCtl);
}

function GoodInput({
  chatController,
  actionRequest,
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback(() => {
    const res = { type: 'custom', value: 'Good!' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Good!
      </Button>
    </div>
  );
}
