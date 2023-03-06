import styled from "styled-components";
import StarSVG from '../assets/star.png';
import {RepoDataProps} from "../types/repo";
import {dateAgo} from "../tools/formatter";

export const RepoCard = ({repo}: RepoDataProps) => {
    return (
            <Container key={repo.id}>
                <Link href={repo.html_url} target="_blank">
                <RepoHeader>
                    <RepoOwner>
                        <OwnerAvatar src={repo.owner.avatar_url} alt="owner"/>
                        <OwnerName>{repo.owner.login}</OwnerName>
                    </RepoOwner>
                    <TimeContainer>
                        <TimeUpdated><b>Last update: {dateAgo(repo.pushed_at)}</b></TimeUpdated>
                        <Time>{dateAgo(repo.created_at)}</Time>
                    </TimeContainer>
                </RepoHeader>
                <Divisor/>
                <RepoName>{repo.name}</RepoName>
                <RepoDescription>{repo.description}</RepoDescription>
                <RepoFooter>
                    <RepoLanguage>{repo.language}</RepoLanguage>
                    <RepoStars>
                        <StarIcon/>
                        <StarCount>{repo.stargazers_count}</StarCount>
                    </RepoStars>
                </RepoFooter>
                <RepoTopics>
                    {repo.topics.map((topic, index) => (
                        <Topic key={index}>{topic}</Topic>
                    ))}
                </RepoTopics>
                </Link>
            </Container>
    )
}

const Container = styled.div`
  box-shadow: 0 5px 10px -10px rgba(70, 96, 187, 0.198567);
  border-radius: 0.5rem;
  background: #fff;
  padding: 3rem 2.7rem;
  margin-bottom: 2.4rem;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RepoName = styled.h2`
  font-weight: 700;
  color: #1a1a1a;
`

const RepoOwner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const OwnerAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1.6rem;
`

const OwnerName = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`

const Time = styled.span`
  font-weight: 400;
  color: #1a1a1a;
`

const TimeUpdated = styled.span`
  font-weight: 400;
  color: #709bd0;
`

const Divisor = styled.div`
  width: 100%;
  height: 1px;
  background: #f1f1f1;
  margin: 0;
`

const RepoDescription = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 1.6rem 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5rem;
`

const RepoTopics = styled.div`
  // scroll github topics
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`

const Topic = styled.span`
  font-weight: 500;
  background: rgba(112, 155, 208, 0.2);
  color: #709bd0;
  border-radius: 0.5rem;
  padding: 0.8rem 1.6rem;
  margin: 0.5rem 1rem 0.5rem 0;
`

const RepoLanguage = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`

const RepoStars = styled.div`
  display: flex;
  align-items: center;
`

const StarIcon = styled.img.attrs({
    src: StarSVG,
    alt: "star"
})`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
`

const StarCount = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`
const Link = styled.a`
    text-decoration: none;
    color: #1a1a1a;
`