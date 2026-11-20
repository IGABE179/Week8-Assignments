import { useOnlineStatus } from '../hooks/useOnlineStatus.js';

export default function ConnectionStatus() {
  const online = useOnlineStatus();
  return (
    <p role="status" className={online ? 'online' : 'offline'}>
      {online ? 'Browser reports online' : 'Browser reports offline'}
    </p>
  );
}
