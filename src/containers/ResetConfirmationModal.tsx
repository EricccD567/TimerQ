import { useContext, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { ColorPaletteContext } from '../ColorPaletteContext';
import { HandleModalProps } from '../shared.types';

interface ResetConfirmationModalProps extends HandleModalProps {
  onReset: () => void;
}

function ResetConfirmationModal({
  onReset,
  isOpen,
  onClose,
}: ResetConfirmationModalProps) {
  const colorPalette = useContext(ColorPaletteContext);

  const cancelRef = useRef<HTMLButtonElement>(null!);

  const handleReset: () => void = () => {
    onReset();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
      scrollBehavior="inside"
      size={['xs', 'sm', 'md']}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        bgColor={colorPalette.background}
        color={colorPalette.text}
      >
        <AlertDialogHeader fontWeight="bold">
          Delete All Timers
        </AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete all timers? You cannot undo this
          action.
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup spacing="3">
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              variant="solid"
              colorScheme="redStatus"
            >
              Delete
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ResetConfirmationModal;
