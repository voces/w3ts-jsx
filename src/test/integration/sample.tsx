/* eslint-disable react/no-deprecated */
import * as React from "../../index";

const App = (): React.Node => (
	<>
		<frame name="GLUETEXTBUTTON" />
		<frame />
		{/* Hello */}
	</>
);

React.render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
