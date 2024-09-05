import { Box } from '@chakra-ui/react';
import { ColorPaletteContext } from './ColorPaletteContext';
import { useColorPalette } from './hooks';

function App() {
  const colorPalette = useColorPalette();
  return (
    <Box>
      <ColorPaletteContext.Provider
        value={colorPalette}
      ></ColorPaletteContext.Provider>
    </Box>
  );
}

export default App;

// import { useEffect, useRef, useState } from 'react';
// import {
//   IconButton,
//   Button,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalFooter,
//   ModalBody,
//   HStack,
//   PinInput,
//   PinInputField,
//   Text,
// } from '@chakra-ui/react';
// import { IoMdAdd } from 'react-icons/io';
// import { FaPlay, FaPause } from 'react-icons/fa6';
// import Countdown from 'react-countdown';
// import Timer from './components/Timer';

// function App() {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [h, setH] = useState(0);
//   const [m, setM] = useState(0);
//   const [s, setS] = useState(0);
//   const handleTime = (timeString: string) => {
//     const hoursString = timeString.slice(0, 2);
//     setH(parseInt(hoursString));
//     const minutesString = timeString.slice(2, 4);
//     setM(parseInt(minutesString));
//     const secondsString = timeString.slice(4, 6);
//     setS(parseInt(secondsString));
//   };

//   interface timer {
//     time: Date;
//   }
//   const [timers, setTimers] = useState<timer[]>([]);
//   const handleAdd = () => {
//     const timeSet = new Date();
//     timeSet.setHours(timeSet.getHours() + h);
//     timeSet.setMinutes(timeSet.getMinutes() + m);
//     timeSet.setSeconds(timeSet.getSeconds() + s);

//     setTimers([...timers, { time: timeSet }]);
//     onClose();
//   };

//   const timersRef = useRef<(Countdown | null)[]>([]);
//   useEffect(() => {
//     timersRef.current = timersRef.current.slice(0, timers.length);
//   }, [timers]);

//   // checking logic here
//   const handlePlay = () => {
//     if (timers[0] && timersRef.current[0]) {
//       timersRef.current[0].getApi().start();
//     }
//   };

//   const handlePause = () => {
//     if (timers[0] && timersRef.current[0]) {
//       timersRef.current[0].getApi().pause();
//     }
//   };

//   return (
//     <>
//       {timers.map((t, i) => (
//         <>
//           <Timer time={t.time} a={(el) => (timersRef.current[i] = el)} />
//           <br />
//         </>
//       ))}
//       {/* {timers.map((t, i) => (
//         <>
//           <Countdown
//             date={t.time}
//             autoStart={false}
//             key={i}
//             ref={(el) => (timersRef.current[i] = el)}
//           />
//           <br />
//         </>
//       ))} */}
//       <IconButton
//         isRound={true}
//         variant="outline"
//         colorScheme="teal"
//         aria-label="Add"
//         fontSize="20px"
//         size="lg"
//         icon={<IoMdAdd />}
//         onClick={onOpen}
//       />
//       <IconButton
//         isRound={true}
//         variant="solid"
//         colorScheme="teal"
//         aria-label="Play"
//         fontSize="20px"
//         size="lg"
//         icon={<FaPlay />}
//         onClick={handlePlay}
//       />
//       <IconButton
//         isRound={true}
//         variant="solid"
//         colorScheme="teal"
//         aria-label="Pause"
//         fontSize="20px"
//         size="lg"
//         icon={<FaPause />}
//         onClick={handlePause}
//       />
//       <Modal isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalBody>
//             <HStack>
//               <PinInput
//                 type="number"
//                 placeholder=""
//                 onChange={(timeString) => handleTime(timeString)}
//               >
//                 <PinInputField />
//                 <PinInputField />
//                 <Text>:</Text>
//                 <PinInputField />
//                 <PinInputField />
//                 <Text>:</Text>
//                 <PinInputField />
//                 <PinInputField />
//               </PinInput>
//             </HStack>
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               variant="outline"
//               colorScheme="red"
//               mr={3}
//               onClick={onClose}
//             >
//               Cancel
//             </Button>
//             <Button variant="solid" colorScheme="teal" onClick={handleAdd}>
//               Add
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default App;
