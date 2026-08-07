type NavItem ={
    label: string;
    active? : boolean;
};

const navigationItems: NavItem[] =[
    {
        label: 'Home',
    },
    {
        label: 'Friends',
    },
    {
        label: 'Groups',
        active: true,
    },
    {
        label: 'Expenses',
    },   
];

export function Sidebar(){
    return(
        <aside>
            <h1>DiviSync</h1>
            <nav>
                {navigationItems.map(item=>(
                    <button key={item.label}>
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

