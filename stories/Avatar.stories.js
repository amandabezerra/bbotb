import Avatar from '@/components/Avatar';
import imageFile from '@/public/images/placeholder.png';

export default {
  title: 'Components/Core/Avatar',
  component: Avatar,
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = { name: 'Gumball', src: imageFile };

export const Selected = Template.bind({});
Selected.args = { name: 'Gumball', src: imageFile, selected: true };
