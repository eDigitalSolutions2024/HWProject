import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample({placement, description}) {

  return (
    <>
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              {description}
            </Tooltip>
          }
        >
          <span className='btn-tooltip'><i className="bi bi-question-circle" disabled={false}></i></span>
        </OverlayTrigger>
    </>
  );
}

export default TooltipPositionedExample;