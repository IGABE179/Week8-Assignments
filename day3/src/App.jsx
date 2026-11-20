import Demo from './components/Demo.jsx';
import Switches from './components/Switches.jsx';
import SearchDemo from './components/SearchDemo.jsx';
import ScorePage from './components/ScorePage.jsx';
import SavedName from './components/SavedName.jsx';
import WindowInfo from './components/WindowInfo.jsx';
import ConnectionStatus from './components/ConnectionStatus.jsx';
import ShiftIndicator from './components/ShiftIndicator.jsx';
import SimpleMenu from './components/SimpleMenu.jsx';

export default function App() {
  return (
    <main>
      <h1>Hooks Toolkit</h1>
      <p>Eight custom Hooks, each in its own file in src/hooks, each with a working demo.</p>

      <Demo
        hook="useToggle"
        description="Flips a boolean. Light and Sound use the same Hook but keep separate state."
      >
        <Switches />
      </Demo>

      <Demo
        hook="useDebounce"
        description="Type quickly: the second line waits until you pause for 350 ms."
      >
        <SearchDemo />
      </Demo>

      <Demo
        hook="useDocumentTitle"
        description="Click the button and watch the browser tab title."
      >
        <ScorePage />
      </Demo>

      <Demo
        hook="useLocalStorage"
        description="Type a name, refresh the page: the name is restored."
      >
        <SavedName />
      </Demo>

      <Demo hook="useWindowSize" description="Resize the window to update the numbers.">
        <WindowInfo />
      </Demo>

      <Demo
        hook="useOnlineStatus"
        description="DevTools → Network → set throttling to Offline to change this."
      >
        <ConnectionStatus />
      </Demo>

      <Demo hook="useKeyPress" description="Hold the Shift key, then release it.">
        <ShiftIndicator />
      </Demo>

      <Demo
        hook="useClickOutside"
        description="Open the menu, then click anywhere outside it to close it."
      >
        <SimpleMenu />
      </Demo>
    </main>
  );
}