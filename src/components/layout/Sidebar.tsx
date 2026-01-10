import { User } from "lucide-react";
import { Card, CardContent } from "../ui/Card";


export function Sidebar() {
    return (
        <aside>
            <Card>

                <div />
                
                <CardContent>
                    {/* Avatar postion to overlap the */}
                    <div>
                        <div>
                            <User />
                        </div>
                    </div>

                    <div>
                        <h3>Your Name</h3>
                        <p>Software Engineer at learn with jabez</p>
                    </div>

                    <hr />

                    {/* stats Section */}
                    <div>
                        <div>
                            <span>Profile viewers</span>
                            <span>100</span>
                        </div>
                        <div>
                            <span>Post Impressions</span>
                            <span>100</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* bottom sidebar items (stick or static) */}
            <Card>
                <p>Recent</p>
                <div>
                    <p>#Software</p>
                    <p>#Nextjs</p>
                    <p>#React</p>
                    <p>#Nodejs</p>
                </div>
            </Card>
        </aside>
    )
}