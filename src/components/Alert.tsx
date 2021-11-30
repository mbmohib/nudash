import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';

interface AlertProps {
  show: boolean;
  title: string;
  status?: 'info' | 'warning' | 'success' | 'error';
  description?: string;
}

export default function AlertExtended({
  show = false,
  status = 'success',
  title,
  description,
}: AlertProps) {
  return (
    <>
      {show ? (
        <Alert status={status} role="alert">
          <AlertIcon />
          <AlertTitle mr={2}>{title}</AlertTitle>
          {description && (
            <AlertDescription display="block">{description}</AlertDescription>
          )}
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      ) : (
        ''
      )}
    </>
  );
}
