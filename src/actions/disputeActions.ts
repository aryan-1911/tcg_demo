import { CREATE_DISPUTE, SAVE_DISPUTE_DATA } from 'const';
import { IActionFn, IDisputeFormValues } from 'interfaces';

export const createDisputeAction: IActionFn<IDisputeFormValues> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: CREATE_DISPUTE.PENDING,
});

export const saveDisputeDataAction: IActionFn<IDisputeFormValues> = (
  payload,
) => ({
  payload,
  type: SAVE_DISPUTE_DATA,
});
