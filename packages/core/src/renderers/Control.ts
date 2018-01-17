import { update } from '../actions';
import { Renderer, RendererProps } from './renderer';

export interface ControlClassNames {
  input: string;
  label: string;
  wrapper: string;
  description: string;
}

export interface ControlProps extends RendererProps {
  data: any;
  path: string;
  parentPath?: string;
  classNames: ControlClassNames;
  id: string;
  visible: boolean;
  enabled: boolean;
  label: string;
  errors: any[];
  dispatch: any;
  required: boolean;
}

export interface ControlState {
  value: any;
  isFocused: boolean;
}

export class Control<P extends ControlProps, S extends ControlState> extends Renderer<P, S> {

  constructor(props: P) {
    super(props);
    // tslint:disable:no-object-literal-type-assertion
    this.state = {
      value: props.data ? props.data : '',
      isFocused: false
    } as Readonly<S>;
    // tslint:enable:no-object-literal-type-assertion
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ value: this.props.data });
    }
  }

  handleChange(value) {
    this.setState({ value });
    this.updateData(value);
  }

  onFocus() {
    this.setState({ isFocused:  true });
  }

  onBlur() {
    this.setState({ isFocused:  false });
  }

  private updateData(value) {
    this.props.dispatch(update(this.props.path, () => value));
  }
}