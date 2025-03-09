import React from 'react'

const SidebarModal = ({children, side, title, id}) => {
  return (
      <div className={side + " modal fade"} id={id} role="dialog" aria-labelledby={id + '0'}>
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id={id + '0'}>{title}</h4>
				</div>
				<div className="modal-body">
                      {children}
				</div>

			</div>
		</div>
	</div>
  )
}

export default SidebarModal