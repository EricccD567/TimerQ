import {
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spacer,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import {
  TbMoonFilled,
  TbSettingsFilled,
  TbSunFilled,
  TbTrash,
} from 'react-icons/tb';
import timerqLogo from '../assets/TimerQ-logo.svg';
import ResetConfirmationModal from './ResetConfirmationModal';
import SettingsModal from './SettingsModal';

function HeaderBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    isOpen: isResetConfirmationOpen,
    onOpen: onResetConfirmationOpen,
    onClose: onResetConfirmationClose,
  } = useDisclosure();

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        align="center"
        gap="2"
        pl="5"
        pr="2.5"
        py="2"
        pos="sticky"
        top="0"
      >
        <Link href="https://github.com/EricccD567/TimerQ" isExternal>
          <Image src={timerqLogo} alt="TimerQ logo" boxSize="7" />
        </Link>
        <Heading as="h1" size="md">
          TimerQ
        </Heading>
        <Spacer />
        <IconButton
          icon={<TbTrash />}
          onClick={onResetConfirmationOpen}
          aria-label="reset"
          colorScheme="redStatus"
          variant="ghost"
          size="md"
          fontSize="20px"
          isRound
        />
        <IconButton
          icon={colorMode === 'light' ? <TbMoonFilled /> : <TbSunFilled />}
          onClick={toggleColorMode}
          aria-label="light dark mode"
          colorScheme="primary"
          variant="ghost"
          size="md"
          fontSize="20px"
          isRound
        />
        <IconButton
          icon={<TbSettingsFilled />}
          onClick={onSettingsOpen}
          aria-label="settings"
          colorScheme="primary"
          variant="ghost"
          size="md"
          fontSize="20px"
          isRound
        />
      </Flex>
      <ResetConfirmationModal
        isOpen={isResetConfirmationOpen}
        onClose={onResetConfirmationClose}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={onSettingsClose} />
    </>
  );
}

export default HeaderBar;
