import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationErros({ errors }: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i:any) => (//i -> index of each error map
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}