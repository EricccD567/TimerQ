import { useContext } from 'react';
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
import { ColorPaletteContext } from '../ColorPaletteContext';

function HeaderBar() {
  const colorPalette = useContext(ColorPaletteContext);

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
    <Flex
      as="header"
      wrap="nowrap"
      align="center"
      gap="2"
      bgColor={colorPalette.background}
      pl="5"
      pr="2.5"
      py="2"
      mb="2"
      pos="sticky"
      top="0"
    >
      <Link href="https://github.com/EricccD567/TimerQ" isExternal>
        <Image src={timerqLogo} alt="TimerQ logo" boxSize="7" />
      </Link>
      <Heading as="h1" size="md" color={colorPalette.text}>
        TimerQ
      </Heading>
      <Spacer />
      <IconButton
        icon={<TbTrash />}
        aria-label="reset"
        colorScheme="redStatus"
        variant="ghost"
        size="md"
        fontSize="20px"
        isRound={true}
      />
      <IconButton
        icon={colorMode === 'light' ? <TbMoonFilled /> : <TbSunFilled />}
        onClick={toggleColorMode}
        aria-label="light dark mode"
        colorScheme="primary"
        variant="ghost"
        size="md"
        fontSize="20px"
        isRound={true}
      />
      <IconButton
        icon={<TbSettingsFilled />}
        aria-label="settings"
        colorScheme="primary"
        variant="ghost"
        size="md"
        fontSize="20px"
        isRound={true}
      />
    </Flex>
  );
}

export default HeaderBar;
