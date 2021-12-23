import { useToast } from '@chakra-ui/react';

export default function useToastExtended() {
  const toast = useToast();

  const showSuccessMessage = (message = 'Success!') => {
    toast({
      title: message,
      status: 'success',
      isClosable: true,
      variant: 'subtle',
      position: 'bottom-right',
    });
  };

  const showErrorMessage = (message = 'Sorry, there has been an error!') => {
    toast({
      title: message,
      variant: 'subtle',
      status: 'error',
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return { showSuccessMessage, showErrorMessage };
}
