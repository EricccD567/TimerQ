import { useContext, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { TbCheck, TbX } from 'react-icons/tb';
import { ColorPaletteContext } from '../ColorPaletteContext';
import { capitalizeFirstLetter, formatTimerInput } from '../utils';
import { HandleModalProps } from '../shared.types';

interface TimerSetterModalProps extends HandleModalProps {
  action: 'add' | 'edit';
  defaultValue: string;
  onSuccess: (input: string) => void;
}

function TimerSetterModal({
  action,
  defaultValue,
  onSuccess,
  isOpen,
  onClose,
}: TimerSetterModalProps) {
  const colorPalette = useContext(ColorPaletteContext);

  const [timerInput, setTimerInput] = useState<string>('');
  const [timerInputErrorMsg, setTimerInputErrorMsg] = useState<string>('');

  const handleTimerInputChange: (input: string) => void = (input) =>
    setTimerInput(input);

  const getTimerInputErrorMsg: () => string = () => {
    if (!timerInput) return 'Enter a timer.';
    if (timerInput.length !== 6) return 'Enter all digits.';
    if (timerInput === '000000') return 'Timer cannot be 00:00:00.';

    const { minutes, seconds } = formatTimerInput(timerInput);
    if (parseInt(minutes) > 59) return 'Minutes must be 00-59.';
    if (parseInt(seconds) > 59) return 'Seconds must be 00-59.';

    return '';
  };

  const handleConfirm: () => void = () => {
    const errorMsg = getTimerInputErrorMsg();
    if (errorMsg) {
      setTimerInputErrorMsg(errorMsg);
      return;
    }

    setTimerInputErrorMsg('');
    onSuccess(timerInput);
    onClose();
  };

  const handleCancel: () => void = () => {
    setTimerInputErrorMsg('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      isCentered
      scrollBehavior="inside"
      size={['xs', 'sm', 'md']}
    >
      <ModalOverlay />
      <ModalContent bgColor={colorPalette.background} color={colorPalette.text}>
        <ModalHeader m="auto" fontWeight="bold">
          {capitalizeFirstLetter(action)} Timer
        </ModalHeader>
        <ModalBody m="auto">
          <HStack>
            <PinInput
              onChange={handleTimerInputChange}
              defaultValue={defaultValue}
              placeholder=""
              size={['sm', 'md', 'lg']}
              type="number"
              isInvalid={timerInputErrorMsg ? true : false}
            >
              <PinInputField />
              <PinInputField />
              <Text fontSize={['lg', 'xl', '2xl']}>:</Text>
              <PinInputField />
              <PinInputField />
              <Text fontSize={['lg', 'xl', '2xl']}>:</Text>
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <HStack>
            <PinInput
              isDisabled
              defaultValue="HHMMSS"
              variant="unstyled"
              size={['sm', 'md', 'lg']}
            >
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
              <Text
                opacity="0"
                fontSize={['lg', 'xl', '2xl']}
                cursor="default"
                _hover={{ cursor: 'default' }}
              >
                :
              </Text>
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
              <Text
                opacity="0"
                fontSize={['lg', 'xl', '2xl']}
                cursor="default"
                _hover={{ cursor: 'default' }}
              >
                :
              </Text>
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
              <PinInputField cursor="default" _hover={{ cursor: 'default' }} />
            </PinInput>
          </HStack>
          {timerInputErrorMsg && (
            <Alert status="error" colorScheme="redStatus">
              <AlertIcon />
              <AlertDescription>{timerInputErrorMsg}</AlertDescription>
            </Alert>
          )}
        </ModalBody>
        <ModalFooter justifyContent="space-evenly">
          <IconButton
            icon={<TbX />}
            onClick={handleCancel}
            aria-label="cancel"
            colorScheme="redStatus"
            variant="solid"
            size="md"
            fontSize="20px"
            isRound
          />
          <IconButton
            icon={<TbCheck />}
            onClick={handleConfirm}
            aria-label="confirm"
            colorScheme="greenStatus"
            variant="solid"
            size="md"
            fontSize="20px"
            isRound
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TimerSetterModal;
